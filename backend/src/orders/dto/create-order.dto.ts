import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsISO8601, IsBoolean } from 'class-validator';

export enum OrderStatus {
  PENDENTE = 'PENDENTE',
  PAGA = 'PAGA',
  PROCESSANDO = 'PROCESSANDO',
  ENVIADA = 'ENVIADA',
  ENTREGUE = 'ENTREGUE',
  CANCELADA = 'CANCELADA',
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  clienteId!: number;

  @IsNumber()
  @IsNotEmpty()
  marcaId!: number;

  @IsNumber()
  @IsNotEmpty()
  valorProdutos!: number;

  @IsNumber()
  @IsNotEmpty()
  valorEnvio!: number;

  @IsNumber()
  @IsNotEmpty()
  valorTotal!: number;

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
