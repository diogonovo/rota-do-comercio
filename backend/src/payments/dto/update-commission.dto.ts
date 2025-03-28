import { PartialType } from '@nestjs/mapped-types';
import { CreateCommissionDto, CommissionStatus } from './create-commission.dto';
import { IsNumber, IsOptional, IsEnum, IsISO8601 } from 'class-validator';

export class UpdateCommissionDto extends PartialType(CreateCommissionDto) {
  @IsNumber()
  @IsOptional()
  percentagem?: number;

  @IsNumber()
  @IsOptional()
  valor?: number;

  @IsEnum(CommissionStatus)
  @IsOptional()
  estado?: CommissionStatus;

  @IsISO8601()
  @IsOptional()
  dataProcessamento?: Date;
}
