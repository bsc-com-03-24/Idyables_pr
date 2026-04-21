import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  orderId!: number;

  @IsNumber()
  @IsNotEmpty()
  customerId!: number;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod!: PaymentMethod;

  // Only required when payment method is mobile money
  @ValidateIf(
    (o) =>
      o.paymentMethod === PaymentMethod.AIRTEL_MONEY ||
      o.paymentMethod === PaymentMethod.TNM_MPAMBA,
  )
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;

  // Only required when payment method is bank transfer
  @ValidateIf((o) => o.paymentMethod === PaymentMethod.BANK_TRANSFER)
  @IsString()
  @IsNotEmpty()
  accountReference?: string;
}