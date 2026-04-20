export declare enum OrderStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    IN_DELIVERY = "IN_DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class Order {
    id: number;
    customerId: number;
    vendorId: number;
    deliveryPersonnelId: number;
    deliveryLocation: string;
    status: OrderStatus;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
