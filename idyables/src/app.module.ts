import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    // Load .env file globally across all modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // SQLite for local development — swap back to Oracle before submission
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') || '1521'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        serviceName: configService.get('DB_SERVICE_NAME'),
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        autoLoadEntities: true,
      }),
    }),
    PaymentModule,
    OrdersModule,
    UsersModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}