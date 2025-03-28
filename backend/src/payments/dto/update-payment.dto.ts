import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto, PaymentStatus } from './create-payment.dto';
import { IsString, IsOptional, IsEnum, IsISO8601 } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsEnum(PaymentStatus)
  @IsOptional()
  estado?: PaymentStatus;

  @IsString()
  @IsOptional()
  referenciaExterna?: string;

  @IsISO8601()
  @IsOptional()
  dataPagamento?: Date;
}
