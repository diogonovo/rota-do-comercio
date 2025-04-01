import { IsOptional, IsDateString } from 'class-validator';

export class GetOrderAnalyticsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
