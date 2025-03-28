import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsISO8601, IsObject } from 'class-validator';

export enum SubscriptionLevel {
  BASICO = 'BASICO',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
}

export class CreateBrandDto {
  @IsNumber()
  @IsNotEmpty()
  utilizadorId: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsObject()
  @IsOptional()
  coresTema?: Record<string, string>;

  @IsString()
  @IsOptional()
  contacto?: string;

  @IsString()
  @IsOptional()
  morada?: string;

  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @IsString()
  @IsOptional()
  localidade?: string;

  @IsString()
  @IsOptional()
  nif?: string;

  @IsEnum(SubscriptionLevel)
  @IsOptional()
  nivelSubscricao?: SubscriptionLevel;

  @IsBoolean()
  @IsOptional()
  ativa?: boolean;
}
