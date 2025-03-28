import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsISO8601 } from 'class-validator';

export enum CommissionStatus {
  PENDENTE = 'PENDENTE',
  PROCESSADA = 'PROCESSADA',
  FALHA = 'FALHA',
  CANCELADA = 'CANCELADA',
}

export class CreateCommissionDto {
  @IsNumber()
  @IsNotEmpty()
  encomendaId: number;

  @IsNumber()
  @IsNotEmpty()
  marcaId: number;

  @IsNumber()
  @IsNotEmpty()
  percentagem: number;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsEnum(CommissionStatus)
  @IsOptional()
  estado?: CommissionStatus;

  @IsISO8601()
  @IsOptional()
  dataProcessamento?: Date;
}
