import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order>;
    trackOrder(id: string): Promise<{
        status: import("./entities/order.entity").OrderStatus;
    }>;
    acceptOrder(id: string): Promise<import("./entities/order.entity").Order>;
    rejectOrder(id: string): Promise<import("./entities/order.entity").Order>;
    assignDelivery(id: string, deliveryPersonnelId: number): Promise<import("./entities/order.entity").Order>;
    markDelivered(id: string): Promise<import("./entities/order.entity").Order>;
    cancelOrder(id: string): Promise<import("./entities/order.entity").Order>;
}
