import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingDto, ShippingStatus } from './create-shipping.dto';
import { IsString, IsOptional, IsEnum, IsISO8601, IsNumber } from 'class-validator';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {
  @IsNumber()
  @IsOptional()
  transportadoraId?: number;

  @IsString()
  @IsOptional()
  referencia?: string;

  @IsEnum(ShippingStatus)
  @IsOptional()
  estado?: ShippingStatus;

  @IsString()
  @IsOptional()
  codigoRastreio?: string;

  @IsString()
  @IsOptional()
  urlRastreio?: string;

  @IsISO8601()
  @IsOptional()
  dataEnvio?: Date;

  @IsISO8601()
  @IsOptional()
  dataEntregaEstimada?: Date;

  @IsISO8601()
  @IsOptional()
  dataEntregaReal?: Date;
}
