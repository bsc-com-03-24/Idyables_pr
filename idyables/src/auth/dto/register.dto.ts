import { IsEnum, IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsEnum(['customer','food vendor','delivery_personel'])
  role: string;

  @IsString()
  password: string;
}
