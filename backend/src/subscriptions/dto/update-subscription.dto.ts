import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto, SubscriptionLevel, SubscriptionPeriodicity, SubscriptionStatus, PaymentMethod } from './create-subscription.dto';
import { IsString, IsOptional, IsEnum, IsNumber, IsISO8601 } from 'class-validator';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsEnum(SubscriptionLevel)
  @IsOptional()
  nivel?: SubscriptionLevel;

  @IsNumber()
  @IsOptional()
  valorMensal?: number;

  @IsNumber()
  @IsOptional()
  valorAnual?: number;

  @IsEnum(SubscriptionPeriodicity)
  @IsOptional()
  periodicidade?: SubscriptionPeriodicity;

  @IsEnum(SubscriptionStatus)
  @IsOptional()
  estado?: SubscriptionStatus;

  @IsISO8601()
  @IsOptional()
  dataInicio?: Date;

  @IsISO8601()
  @IsOptional()
  dataFim?: Date;

  @IsEnum(PaymentMethod)
  @IsOptional()
  metodoPagamento?: PaymentMethod;
}
