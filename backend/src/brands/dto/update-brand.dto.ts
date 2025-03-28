import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto, SubscriptionLevel } from './create-brand.dto';
import { IsString, IsOptional, IsBoolean, IsEnum, IsISO8601, IsObject } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsString()
  @IsOptional()
  nome?: string;

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

  @IsISO8601()
  @IsOptional()
  dataRenovacao?: Date;

  @IsBoolean()
  @IsOptional()
  ativa?: boolean;
}
