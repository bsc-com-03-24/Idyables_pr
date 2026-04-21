import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrdersService } from '../orders/orders.service';
export declare class PaymentService {
    private readonly paymentRepository;
    private readonly ordersService;
    constructor(paymentRepository: Repository<Payment>, ordersService: OrdersService);
    initiatePayment(dto: CreatePaymentDto): Promise<Payment>;
    private resolveReference;
    private processPayment;
    private simulateMobileMoney;
    private simulateBankTransfer;
    private simulateCash;
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    findByOrder(orderId: number): Promise<Payment[]>;
    confirmCashPayment(id: number): Promise<Payment>;
    refundPayment(id: number): Promise<Payment>;
}
