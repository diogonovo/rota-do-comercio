import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsISO8601 } from 'class-validator';

export enum ShippingStatus {
  AGUARDANDO_RECOLHA = 'AGUARDANDO_RECOLHA',
  RECOLHIDO = 'RECOLHIDO',
  EM_TRANSITO = 'EM_TRANSITO',
  ENTREGUE = 'ENTREGUE',
  DEVOLVIDO = 'DEVOLVIDO',
}

export class CreateShippingDto {
  @IsNumber()
  @IsNotEmpty()
  encomendaId: number;

  @IsNumber()
  @IsNotEmpty()
  transportadoraId: number;

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
