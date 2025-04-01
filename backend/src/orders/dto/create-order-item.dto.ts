import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  produtoId!: number;

  @IsNumber()
  @IsOptional()
  varianteId?: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade!: number;
}

