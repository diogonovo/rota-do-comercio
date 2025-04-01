import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, OrderStatus } from './create-order.dto';
import { IsString, IsOptional, IsEnum, IsISO8601, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatus)
  @IsOptional()
  estado?: OrderStatus;

  @IsString()
  @IsOptional()
  metodoPagamento?: string;

  @IsString()
  @IsOptional()
  referenciaPagamento?: string;

  @IsISO8601()
  @IsOptional()
  dataPagamento?: Date;

  @IsNumber()
  @IsOptional()
  enderecoEntregaId?: number;

  @IsNumber()
  @IsOptional()
  enderecoFaturacaoId?: number;
}
