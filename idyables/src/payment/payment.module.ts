import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { OrdersModule } from '../orders/orders.module';

// PaymentModule imports OrdersModule because PaymentService
// needs OrdersService to validate orders before processing payment
@Module({
  imports: [
    // Register Payment entity with TypeORM for this module
    TypeOrmModule.forFeature([Payment]),
    // Import OrdersModule so we can use OrdersService inside PaymentService
    OrdersModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}