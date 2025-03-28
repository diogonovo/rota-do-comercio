import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async highlightProduct(id: number) {
    // Verificar se o produto existe
    const product = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        marca: true,
      },
    });

    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    // Verificar se o usuário tem permissão para destacar o produto
    // (isso já é verificado pelo SubscriptionGuard no controller)

    // Destacar o produto
    return this.prisma.produto.update({
      where: { id },
      data: {
        destaque: true,
      },
    });
  }

  async findFeatured() {
    // Buscar produtos em destaque
    return this.prisma.produto.findMany({
      where: {
        destaque: true,
        ativo: true,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
            logoUrl: true,
          },
        },
        imagens: {
          take: 5,
          orderBy: {
            ordem: 'asc',
          },
        },
        variantes: true,
      },
    });
  }

  // Implementar limitações de produtos por nível de subscrição
  async validateProductLimit(brandId: number) {
    // Buscar a marca
    const brand = await this.prisma.marca.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${brandId} não encontrada`);
    }

    // Buscar o número atual de produtos da marca
    const productCount = await this.prisma.produto.count({
      where: { marcaId: brandId },
    });

    // Definir limites por nível de subscrição
    let productLimit = 50; // BASICO
    if (brand.nivelSubscricao === 'PRO') {
      productLimit = 200;
    } else if (brand.nivelSubscricao === 'PREMIUM') {
      productLimit = -1; // ilimitado
    }

    // Verificar se o limite foi atingido
    if (productLimit !== -1 && productCount >= productLimit) {
      throw new Error(`Limite de produtos atingido para o nível de subscrição ${brand.nivelSubscricao}. Faça upgrade para adicionar mais produtos.`);
    }

    return true;
  }

  // Implementar limitações de imagens por produto por nível de subscrição
  async validateImageLimit(productId: number) {
    // Buscar o produto e a marca
    const product = await this.prisma.produto.findUnique({
      where: { id: productId },
      include: {
        marca: true,
        imagens: true,
      },
    });

    if (!product) {
      throw new Error(`Produto com ID ${productId} não encontrado`);
    }

    // Definir limites por nível de subscrição
    let imageLimit = 1; // BASICO
    if (product.marca.nivelSubscricao === 'PRO') {
      imageLimit = 5;
    } else if (product.marca.nivelSubscricao === 'PREMIUM') {
      imageLimit = -1; // ilimitado
    }

    // Verificar se o limite foi atingido
    if (imageLimit !== -1 && product.imagens.length >= imageLimit) {
      throw new Error(`Limite de imagens por produto atingido para o nível de subscrição ${product.marca.nivelSubscricao}. Faça upgrade para adicionar mais imagens.`);
    }

    return true;
  }

  // Sobrescrever o método create para implementar a validação de limite de produtos
  async create(createProductDto: any) {
    // Validar limite de produtos
    await this.validateProductLimit(createProductDto.marcaId);

    // Criar o produto
    const product = await this.prisma.produto.create({
      data: createProductDto,
    });

    return product;
  }

  // Sobrescrever o método addImage para implementar a validação de limite de imagens
  async addImage(id: number, createProductImageDto: any) {
    // Validar limite de imagens
    await this.validateImageLimit(id);

    // Adicionar a imagem
    const image = await this.prisma.imagemProduto.create({
      data: {
        produtoId: id,
        url: createProductImageDto.url,
        ordem: createProductImageDto.ordem || 0,
      },
    });

    return image;
  }
}
