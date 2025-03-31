import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class GetBrandsDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
