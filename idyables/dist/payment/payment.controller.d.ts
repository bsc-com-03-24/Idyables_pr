import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initiatePayment(createPaymentDto: CreatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    findAll(): Promise<import("./entities/payment.entity").Payment[]>;
    findOne(id: string): Promise<import("./entities/payment.entity").Payment>;
    findByOrder(orderId: string): Promise<import("./entities/payment.entity").Payment[]>;
    confirmCash(id: string): Promise<import("./entities/payment.entity").Payment>;
    refundPayment(id: string): Promise<import("./entities/payment.entity").Payment>;
}
