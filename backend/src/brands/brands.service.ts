import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsDto } from './dto/get-brands.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.prisma.marca.create({
      data: createBrandDto,
    });
  }

  async findAll(query: GetBrandsDto) {
    const filters: any = {};

    if (query.nome) {
      filters.nome = {
        contains: query.nome,
        mode: 'insensitive',
      };
    }

    if (query.featured !== undefined) {
      filters.destaque = query.featured === 'true';
    }

    return this.prisma.marca.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
    const brand = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${id} não encontrada`);
    }

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.marca.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async customizeStore(id: number, customizationData: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${id} não encontrada`);
    }

    // Atualizar configurações de personalização da loja
    return this.prisma.marca.update({
      where: { id },
      data: {
        coresTema: JSON.stringify({
          corPrimaria: customizationData.corPrimaria,
          corSecundaria: customizationData.corSecundaria,
        }),
        bannerUrl: customizationData.bannerUrl,
        descricaoLoja: customizationData.descricaoLoja
      },
    });
  }

  async setFeatured(id: number, featured: boolean) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${id} não encontrada`);
    }

    // Atualizar status de destaque da marca
    return this.prisma.marca.update({
      where: { id },
      data: {
        destaque: featured,
      },
    });
  }

  async getFeaturedBrands() {
    // Buscar marcas em destaque
    return this.prisma.marca.findMany({
      where: {
        destaque: true,
        ativa: true,
      },
      select: {
        id: true,
        nome: true,
        logoUrl: true,
        bannerUrl: true,
        descricaoLoja: true,
        coresTema: true
      },
    });
  }
/*
  async getAnalytics(id: number, analyticsParams: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${id} não encontrada`);
    }

    // Período de análise
    const startDate = analyticsParams.startDate ? new Date(analyticsParams.startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const endDate = analyticsParams.endDate ? new Date(analyticsParams.endDate) : new Date();

    // Buscar dados de vendas
    const orders = await this.prisma.encomenda.findMany({
      where: {
        marcaId: id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        itens: true,
      },
    });

    // Calcular métricas
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.valorTotal, 0);
    const totalProducts = orders.reduce((sum, order) => sum + order.itens.length, 0);
    
    // Produtos mais vendidos
    const productCounts = {};
    orders.forEach(order => {
      order.itens.forEach(item => {
        if (productCounts[item.produtoId]) {
          productCounts[item.produtoId] += item.quantidade;
        } else {
          productCounts[item.produtoId] = item.quantidade;
        }
      });
    });

    const topProducts = await Promise.all(
      Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(async ([produtoId, quantidade]) => {
          const produto = await this.prisma.produto.findUnique({
            where: { id: parseInt(produtoId) },
            select: {
              id: true,
              nome: true,
              imagens: {
                take: 1,
              },
            },
          });
          return {
            produto,
            quantidade,
          };
        })
    );

    // Retornar analytics
    return {
      periodo: {
        inicio: startDate,
        fim: endDate,
      },
      metricas: {
        totalEncomendas: totalOrders,
        receitaTotal: totalRevenue,
        totalProdutos: totalProducts,
        mediaValorEncomenda: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      },
      produtosMaisVendidos: topProducts,
    };
  }

  async createMarketingCampaign(id: number, campaignData: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${id} não encontrada`);
    }

    // Criar campanha de marketing
    // Nota: Este é um exemplo simplificado. Em um sistema real, seria necessário
    // implementar a integração com serviços de email marketing, redes sociais, etc.
    return {
      id: Math.floor(Math.random() * 1000),
      marcaId: id,
      nome: campaignData.nome,
      tipo: campaignData.tipo,
      dataInicio: campaignData.dataInicio,
      dataFim: campaignData.dataFim,
      status: 'AGENDADA',
      mensagem: 'Campanha de marketing criada com sucesso. Em um sistema real, esta campanha seria enviada através de email marketing, redes sociais, etc.',
    };
  }*/
}
