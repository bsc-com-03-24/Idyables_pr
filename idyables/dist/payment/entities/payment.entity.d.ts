import { Order } from '../../orders/entities/order.entity';
export declare enum PaymentMethod {
    AIRTEL_MONEY = "AIRTEL_MONEY",
    TNM_MPAMBA = "TNM_MPAMBA",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    CANCELLED = "CANCELLED"
}
export declare class Payment {
    id: number;
    orderId: number;
    order: Order;
    customerId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    paymentReference: string;
    transactionId: string;
    failureReason: string;
    createdAt: Date;
    updatedAt: Date;
}
