import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { UserType } from '../../auth/dto/register.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  tipo!: UserType;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
