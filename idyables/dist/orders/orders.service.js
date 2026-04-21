"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
let OrdersService = class OrdersService {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(createOrderDto) {
        const order = this.orderRepository.create(createOrderDto);
        return await this.orderRepository.save(order);
    }
    async findAll() {
        return await this.orderRepository.find();
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        return order;
    }
    async acceptOrder(id) {
        const order = await this.findOne(id);
        order.status = order_entity_1.OrderStatus.ACCEPTED;
        return await this.orderRepository.save(order);
    }
    async rejectOrder(id) {
        const order = await this.findOne(id);
        order.status = order_entity_1.OrderStatus.REJECTED;
        return await this.orderRepository.save(order);
    }
    async assignDeliveryPersonnel(id, deliveryPersonnelId) {
        const order = await this.findOne(id);
        order.deliveryPersonnelId = deliveryPersonnelId;
        order.status = order_entity_1.OrderStatus.IN_DELIVERY;
        return await this.orderRepository.save(order);
    }
    async trackOrder(id) {
        const order = await this.findOne(id);
        return { status: order.status };
    }
    async cancelOrder(id) {
        const order = await this.findOne(id);
        order.status = order_entity_1.OrderStatus.CANCELLED;
        return await this.orderRepository.save(order);
    }
    async markDelivered(id) {
        const order = await this.findOne(id);
        order.status = order_entity_1.OrderStatus.DELIVERED;
        return await this.orderRepository.save(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map