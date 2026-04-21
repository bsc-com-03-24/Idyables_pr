import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsBoolean,
  IsOptional,

} from 'class-validator';
import { FoodCategory } from '../entities/menu.entity';

export class CreateMenuDto {

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsEnum(FoodCategory)
  @IsNotEmpty()
  category!: FoodCategory;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  @IsNotEmpty()
  vendorId!: number;

}
