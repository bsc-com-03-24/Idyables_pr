import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

// All routes in this controller are prefixed with /payment
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // POST /payment — customer initiates a payment
  // Body must match CreatePaymentDto — validated automatically
  @Post()
  initiatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.initiatePayment(createPaymentDto);
  }

  // GET /payment — returns all payments
  // Useful for admin to see all transactions
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  // GET /payment/:id — returns a single payment by id
  // +id converts the url string param to a number
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  // GET /payment/order/:orderId — returns all payments for a specific order
  // One order can have multiple payment attempts
  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrder(+orderId);
  }

  // PATCH /payment/:id/confirm-cash — delivery person confirms cash was received
  // Only works for cash on delivery payments
  @Patch(':id/confirm-cash')
  confirmCash(@Param('id') id: string) {
    return this.paymentService.confirmCashPayment(+id);
  }

  // PATCH /payment/:id/refund — refund a completed payment
  // Only completed payments can be refunded
  @Patch(':id/refund')
  refundPayment(@Param('id') id: string) {
    return this.paymentService.refundPayment(+id);
  }
}