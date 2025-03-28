import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCarrierDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsBoolean()
  @IsOptional()
  ativa?: boolean;
}
