import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsISO8601 } from 'class-validator';

export enum PaymentType {
  ENCOMENDA = 'ENCOMENDA',
  SUBSCRICAO = 'SUBSCRICAO',
}

export enum PaymentStatus {
  PENDENTE = 'PENDENTE',
  PROCESSADO = 'PROCESSADO',
  FALHA = 'FALHA',
  REEMBOLSADO = 'REEMBOLSADO',
}

export enum PaymentMethod {
  CARTAO = 'CARTAO',
  PAYPAL = 'PAYPAL',
  MULTIBANCO = 'MULTIBANCO',
  MBWAY = 'MBWAY',
}

export class CreatePaymentDto {
  @IsNumber()
  @IsOptional()
  marcaId?: number;

  @IsNumber()
  @IsOptional()
  encomendaId?: number;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  tipo: PaymentType;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  estado?: PaymentStatus;

  @IsString()
  @IsOptional()
  referenciaExterna?: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  metodo: PaymentMethod;

  @IsISO8601()
  @IsOptional()
  dataPagamento?: Date;
}
