import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    acceptOrder(id: number): Promise<Order>;
    rejectOrder(id: number): Promise<Order>;
    assignDeliveryPersonnel(id: number, deliveryPersonnelId: number): Promise<Order>;
    trackOrder(id: number): Promise<{
        status: OrderStatus;
    }>;
    cancelOrder(id: number): Promise<Order>;
    markDelivered(id: number): Promise<Order>;
}
