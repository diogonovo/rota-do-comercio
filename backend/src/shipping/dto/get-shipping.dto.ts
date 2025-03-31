import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class GetShippingsDto {
  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumberString()
  transportadoraId?: string;

  @IsOptional()
  @IsNumberString()
  encomendaId?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
