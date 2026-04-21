import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  customerId!: number;

  @IsNumber()
  @IsNotEmpty()
  vendorId!: number;

  @IsString()
  @IsNotEmpty()
  deliveryLocation!: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice!: number;
}