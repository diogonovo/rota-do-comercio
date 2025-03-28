import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptional()
  ordem?: number;
}
