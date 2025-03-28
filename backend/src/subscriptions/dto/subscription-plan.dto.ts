import { IsString, IsArray, IsObject, IsOptional } from 'class-validator';

export class SubscriptionPlanDto {
  @IsString()
  nivel: string;

  @IsString()
  descricao: string;

  @IsArray()
  beneficios: string[];

  @IsObject()
  limitacoes: {
    maxProdutos: number;
    maxImagensPorProduto: number;
    comissao: number;
  };

  @IsOptional()
  valorMensal?: number;

  @IsOptional()
  valorAnual?: number;
}
