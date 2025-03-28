import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsISO8601 } from 'class-validator';

export enum SubscriptionLevel {
  BASICO = 'BASICO',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
}

export enum SubscriptionPeriodicity {
  MENSAL = 'MENSAL',
  ANUAL = 'ANUAL',
}

export enum SubscriptionStatus {
  ATIVA = 'ATIVA',
  INATIVA = 'INATIVA',
  PERIODO_TESTE = 'PERIODO_TESTE',
  CANCELADA = 'CANCELADA',
}

export enum PaymentMethod {
  CARTAO = 'CARTAO',
  PAYPAL = 'PAYPAL',
  MULTIBANCO = 'MULTIBANCO',
  MBWAY = 'MBWAY',
}

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  marcaId: number;

  @IsEnum(SubscriptionLevel)
  @IsNotEmpty()
  nivel: SubscriptionLevel;

  @IsNumber()
  @IsOptional()
  valorMensal?: number;

  @IsNumber()
  @IsOptional()
  valorAnual?: number;

  @IsEnum(SubscriptionPeriodicity)
  @IsNotEmpty()
  periodicidade: SubscriptionPeriodicity;

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

  @IsBoolean()
  @IsOptional()
  criarPagamento?: boolean;
}
