import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Customer places an order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // Get a single order by id
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  // Vendor accepts order
  async acceptOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);
    order.status = OrderStatus.ACCEPTED;
    return await this.orderRepository.save(order);
  }

  // Vendor rejects order
  async rejectOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);
    order.status = OrderStatus.REJECTED;
    return await this.orderRepository.save(order);
  }

  // Assign delivery personnel
  async assignDeliveryPersonnel(
    id: number,
    deliveryPersonnelId: number,
  ): Promise<Order> {
    const order = await this.findOne(id);
    order.deliveryPersonnelId = deliveryPersonnelId;
    order.status = OrderStatus.IN_DELIVERY;
    return await this.orderRepository.save(order);
  }

  // Customer tracks their order
  async trackOrder(id: number): Promise<{ status: OrderStatus }> {
    const order = await this.findOne(id);
    return { status: order.status };
  }

  // Cancel order
  async cancelOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);
    order.status = OrderStatus.CANCELLED;
    return await this.orderRepository.save(order);
  }

  // Mark order as delivered
  async markDelivered(id: number): Promise<Order> {
    const order = await this.findOne(id);
    order.status = OrderStatus.DELIVERED;
    return await this.orderRepository.save(order);
  }
}