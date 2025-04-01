import { IsOptional, IsDateString } from 'class-validator';

export class GetOrderAnalyticsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
