import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export enum UserType {
  ADMIN = 'ADMIN',
  MARCA = 'MARCA',
  CLIENTE = 'CLIENTE',
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  tipo: UserType;
}
