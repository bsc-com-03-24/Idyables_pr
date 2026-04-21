import { PaymentMethod } from '../entities/payment.entity';
export declare class CreatePaymentDto {
    orderId: number;
    customerId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    phoneNumber?: string;
    accountReference?: string;
}
