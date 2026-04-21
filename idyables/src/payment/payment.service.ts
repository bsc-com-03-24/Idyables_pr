import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Payment,
  PaymentStatus,
  PaymentMethod,
} from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    // Inject the Payment repository — our database remote control for the payments table
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    // Inject OrdersService so we can validate the order before processing payment
    private readonly ordersService: OrdersService,
  ) {}

  // Entry point — called when a customer initiates a payment
  async initiatePayment(dto: CreatePaymentDto): Promise<Payment> {
    // First verify the order actually exists — throws 404 if not found
    const order = await this.ordersService.findOne(dto.orderId);

    // Guard clause — prevent payment on orders that are cancelled or rejected
    // No point processing money for a dead order
    if (
      order.status === OrderStatus.CANCELLED ||
      order.status === OrderStatus.REJECTED
    ) {
      throw new BadRequestException(
        `Cannot process payment for an order that is ${order.status}`,
      );
    }

    // Build the payment record from the DTO
    // resolveReference() figures out the right payment reference based on method
    const payment = this.paymentRepository.create({
      orderId: dto.orderId,
      customerId: dto.customerId,
      amount: dto.amount,
      paymentMethod: dto.paymentMethod,
      paymentReference: this.resolveReference(dto),
      status: PaymentStatus.PENDING,
    });

    // Save the initial PENDING payment to the database
    const saved = await this.paymentRepository.save(payment);

    // Hand off to processPayment which simulates the actual transaction
    return this.processPayment(saved);
  }

  // Determines what to store as the payment reference based on payment method
  // Mobile money → phone number | Bank → account reference | Cash → empty string
  private resolveReference(dto: CreatePaymentDto): string {
    if (
      dto.paymentMethod === PaymentMethod.AIRTEL_MONEY ||
      dto.paymentMethod === PaymentMethod.TNM_MPAMBA
    ) {
      return dto.phoneNumber || '';
    }
    if (dto.paymentMethod === PaymentMethod.BANK_TRANSFER) {
      return dto.accountReference || '';
    }
    // Cash on delivery needs no reference
    return '';
  }

  // Routes the payment to the correct simulation based on payment method
  // In production this is where you'd call real Airtel/TNM/Bank APIs
  private async processPayment(payment: Payment): Promise<Payment> {
    // Mark as PROCESSING while the transaction is being handled
    payment.status = PaymentStatus.PROCESSING;
    await this.paymentRepository.save(payment);

    // Route to the correct payment simulation
    if (
      payment.paymentMethod === PaymentMethod.AIRTEL_MONEY ||
      payment.paymentMethod === PaymentMethod.TNM_MPAMBA
    ) {
      return this.simulateMobileMoney(payment);
    }

    if (payment.paymentMethod === PaymentMethod.BANK_TRANSFER) {
      return this.simulateBankTransfer(payment);
    }

    // Default to cash on delivery
    return this.simulateCash(payment);
  }

  // Simulates a mobile money transaction for both Airtel Money and TNM Mpamba
  // Uses 90% success rate to mimic real world network failures
  private async simulateMobileMoney(payment: Payment): Promise<Payment> {
    const success = Math.random() > 0.1;

    if (success) {
      payment.status = PaymentStatus.COMPLETED;
      // Generate a unique transaction ID — in production this comes from the provider
      payment.transactionId = `MOB-${Date.now()}`;
    } else {
      payment.status = PaymentStatus.FAILED;
      payment.failureReason = 'Mobile money transaction failed. Try again.';
    }

    return this.paymentRepository.save(payment);
  }

  // Simulates a bank transfer — stays PROCESSING because banks take time to clear
  // In production a webhook from the bank would later update this to COMPLETED
  private async simulateBankTransfer(payment: Payment): Promise<Payment> {
    payment.status = PaymentStatus.PROCESSING;
    payment.transactionId = `BANK-${Date.now()}`;
    return this.paymentRepository.save(payment);
  }

  // Cash on delivery stays PENDING until the delivery person confirms receipt
  // confirmCashPayment() handles the manual confirmation
  private async simulateCash(payment: Payment): Promise<Payment> {
    payment.status = PaymentStatus.PENDING;
    payment.transactionId = `CASH-${Date.now()}`;
    return this.paymentRepository.save(payment);
  }

  // Returns all payments — useful for admin dashboards
  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  // Returns a single payment by id — throws 404 if not found
  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  // Returns all payments linked to a specific order
  // Useful because one order could have multiple payment attempts
  async findByOrder(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { orderId } });
  }

  // Manually marks a cash on delivery payment as COMPLETED
  // Called by delivery personnel after physically collecting the money
  async confirmCashPayment(id: number): Promise<Payment> {
    const payment = await this.findOne(id);

    // Safety check — only cash payments can be manually confirmed
    if (payment.paymentMethod !== PaymentMethod.CASH_ON_DELIVERY) {
      throw new BadRequestException('This is not a cash on delivery payment');
    }

    payment.status = PaymentStatus.COMPLETED;
    return this.paymentRepository.save(payment);
  }

  // Refunds a completed payment — only COMPLETED payments qualify
  // In production this would trigger a reversal with the payment provider
  async refundPayment(id: number): Promise<Payment> {
    const payment = await this.findOne(id);

    // Guard clause — can't refund what was never completed
    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    payment.status = PaymentStatus.REFUNDED;
    return this.paymentRepository.save(payment);
  }
}
