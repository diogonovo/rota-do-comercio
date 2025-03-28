import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrierDto } from './create-carrier.dto';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCarrierDto extends PartialType(CreateCarrierDto) {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsBoolean()
  @IsOptional()
  ativa?: boolean;
}
