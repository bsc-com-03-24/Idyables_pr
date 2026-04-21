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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const orders_service_1 = require("../orders/orders.service");
const order_entity_1 = require("../orders/entities/order.entity");
let PaymentService = class PaymentService {
    paymentRepository;
    ordersService;
    constructor(paymentRepository, ordersService) {
        this.paymentRepository = paymentRepository;
        this.ordersService = ordersService;
    }
    async initiatePayment(dto) {
        const order = await this.ordersService.findOne(dto.orderId);
        if (order.status === order_entity_1.OrderStatus.CANCELLED ||
            order.status === order_entity_1.OrderStatus.REJECTED) {
            throw new common_1.BadRequestException(`Cannot process payment for an order that is ${order.status}`);
        }
        const payment = this.paymentRepository.create({
            orderId: dto.orderId,
            customerId: dto.customerId,
            amount: dto.amount,
            paymentMethod: dto.paymentMethod,
            paymentReference: this.resolveReference(dto),
            status: payment_entity_1.PaymentStatus.PENDING,
        });
        const saved = await this.paymentRepository.save(payment);
        return this.processPayment(saved);
    }
    resolveReference(dto) {
        if (dto.paymentMethod === payment_entity_1.PaymentMethod.AIRTEL_MONEY ||
            dto.paymentMethod === payment_entity_1.PaymentMethod.TNM_MPAMBA) {
            return dto.phoneNumber || '';
        }
        if (dto.paymentMethod === payment_entity_1.PaymentMethod.BANK_TRANSFER) {
            return dto.accountReference || '';
        }
        return '';
    }
    async processPayment(payment) {
        payment.status = payment_entity_1.PaymentStatus.PROCESSING;
        await this.paymentRepository.save(payment);
        if (payment.paymentMethod === payment_entity_1.PaymentMethod.AIRTEL_MONEY ||
            payment.paymentMethod === payment_entity_1.PaymentMethod.TNM_MPAMBA) {
            return this.simulateMobileMoney(payment);
        }
        if (payment.paymentMethod === payment_entity_1.PaymentMethod.BANK_TRANSFER) {
            return this.simulateBankTransfer(payment);
        }
        return this.simulateCash(payment);
    }
    async simulateMobileMoney(payment) {
        const success = Math.random() > 0.1;
        if (success) {
            payment.status = payment_entity_1.PaymentStatus.COMPLETED;
            payment.transactionId = `MOB-${Date.now()}`;
        }
        else {
            payment.status = payment_entity_1.PaymentStatus.FAILED;
            payment.failureReason = 'Mobile money transaction failed. Try again.';
        }
        return this.paymentRepository.save(payment);
    }
    async simulateBankTransfer(payment) {
        payment.status = payment_entity_1.PaymentStatus.PROCESSING;
        payment.transactionId = `BANK-${Date.now()}`;
        return this.paymentRepository.save(payment);
    }
    async simulateCash(payment) {
        payment.status = payment_entity_1.PaymentStatus.PENDING;
        payment.transactionId = `CASH-${Date.now()}`;
        return this.paymentRepository.save(payment);
    }
    async findAll() {
        return this.paymentRepository.find();
    }
    async findOne(id) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException(`Payment #${id} not found`);
        return payment;
    }
    async findByOrder(orderId) {
        return this.paymentRepository.find({ where: { orderId } });
    }
    async confirmCashPayment(id) {
        const payment = await this.findOne(id);
        if (payment.paymentMethod !== payment_entity_1.PaymentMethod.CASH_ON_DELIVERY) {
            throw new common_1.BadRequestException('This is not a cash on delivery payment');
        }
        payment.status = payment_entity_1.PaymentStatus.COMPLETED;
        return this.paymentRepository.save(payment);
    }
    async refundPayment(id) {
        const payment = await this.findOne(id);
        if (payment.status !== payment_entity_1.PaymentStatus.COMPLETED) {
            throw new common_1.BadRequestException('Only completed payments can be refunded');
        }
        payment.status = payment_entity_1.PaymentStatus.REFUNDED;
        return this.paymentRepository.save(payment);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        orders_service_1.OrdersService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map