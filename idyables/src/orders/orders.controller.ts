import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders — customer places an order
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  // GET /orders — get all orders
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // GET /orders/:id — get a single order
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // GET /orders/:id/track — customer tracks their order
  @Get(':id/track')
  trackOrder(@Param('id') id: string) {
    return this.ordersService.trackOrder(+id);
  }

  // PATCH /orders/:id/accept — vendor accepts order
  @Patch(':id/accept')
  acceptOrder(@Param('id') id: string) {
    return this.ordersService.acceptOrder(+id);
  }

  // PATCH /orders/:id/reject — vendor rejects order
  @Patch(':id/reject')
  rejectOrder(@Param('id') id: string) {
    return this.ordersService.rejectOrder(+id);
  }

  // PATCH /orders/:id/assign — assign delivery personnel
  @Patch(':id/assign')
  assignDelivery(
    @Param('id') id: string,
    @Body('deliveryPersonnelId') deliveryPersonnelId: number,
  ) {
    return this.ordersService.assignDeliveryPersonnel(+id, deliveryPersonnelId);
  }

  // PATCH /orders/:id/delivered — mark order as delivered
  @Patch(':id/delivered')
  markDelivered(@Param('id') id: string) {
    return this.ordersService.markDelivered(+id);
  }

  // PATCH /orders/:id/cancel — cancel order
  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(+id);
  }
}