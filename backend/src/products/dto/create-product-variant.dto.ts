import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  valor: string;

  @IsNumber()
  @IsOptional()
  precoAdicional?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  sku?: string;
}
