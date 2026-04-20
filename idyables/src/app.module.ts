import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Load .env file globally across all modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // SQLite for local development — swap back to Oracle before submission
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'idyables_dev.db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    PaymentModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}