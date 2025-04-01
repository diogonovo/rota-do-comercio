import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class ExportOrdersDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['json', 'csv', 'xlsx'])
  format?: string;
}
