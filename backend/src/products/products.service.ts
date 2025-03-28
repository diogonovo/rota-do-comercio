import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: createProductDto.marcaId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${createProductDto.marcaId} não encontrada`);
    }

    // Verificar limites de produtos baseado no nível de subscrição
    const productsCount = await this.prisma.produto.count({
      where: { marcaId: createProductDto.marcaId },
    });

    if (brand.nivelSubscricao === 'BASICO' && productsCount >= 50) {
      throw new BadRequestException('O plano Básico permite apenas 50 produtos. Faça upgrade para adicionar mais produtos.');
    }

    if (brand.nivelSubscricao === 'PRO' && productsCount >= 200) {
      throw new BadRequestException('O plano Pro permite apenas 200 produtos. Faça upgrade para adicionar mais produtos.');
    }

    // Criar produto
    const product = await this.prisma.produto.create({
      data: {
        marcaId: createProductDto.marcaId,
        nome: createProductDto.nome,
        descricao: createProductDto.descricao,
        preco: createProductDto.preco,
        precoPromocional: createProductDto.precoPromocional,
        stock: createProductDto.stock || 0,
        sku: createProductDto.sku,
        categoria: createProductDto.categoria,
        subcategoria: createProductDto.subcategoria,
        destaque: createProductDto.destaque || false,
        ativo: createProductDto.ativo !== undefined ? createProductDto.ativo : true,
      },
    });

    return product;
  }

  async findAll(query?: any) {
    const where: any = {};
    
    if (query?.ativo !== undefined) {
      where.ativo = query.ativo === 'true';
    }
    
    if (query?.marcaId) {
      where.marcaId = parseInt(query.marcaId);
    }
    
    if (query?.categoria) {
      where.categoria = query.categoria;
    }
    
    if (query?.subcategoria) {
      where.subcategoria = query.subcategoria;
    }
    
    if (query?.destaque !== undefined) {
      where.destaque = query.destaque === 'true';
    }
    
    if (query?.search) {
      where.OR = [
        { nome: { contains: query.search, mode: 'insensitive' } },
        { descricao: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.produto.findMany({
        where,
        skip,
        take: limit,
        orderBy: query?.orderBy === 'preco_asc' 
          ? { preco: 'asc' } 
          : query?.orderBy === 'preco_desc' 
            ? { preco: 'desc' } 
            : { createdAt: 'desc' },
        include: {
          marca: {
            select: {
              id: true,
              nome: true,
              logoUrl: true,
            },
          },
          imagens: {
            orderBy: {
              ordem: 'asc',
            },
          },
          variantes: true,
        },
      }),
      this.prisma.produto.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
            logoUrl: true,
            nivelSubscricao: true,
          },
        },
        imagens: {
          orderBy: {
            ordem: 'asc',
          },
        },
        variantes: true,
        avaliacoes: {
          where: {
            aprovada: true,
          },
          include: {
            cliente: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar se o produto existe
    await this.findOne(id);

    // Atualizar produto
    return this.prisma.produto.update({
      where: { id },
      data: {
        nome: updateProductDto.nome,
        descricao: updateProductDto.descricao,
        preco: updateProductDto.preco,
        precoPromocional: updateProductDto.precoPromocional,
        stock: updateProductDto.stock,
        sku: updateProductDto.sku,
        categoria: updateProductDto.categoria,
        subcategoria: updateProductDto.subcategoria,
        destaque: updateProductDto.destaque,
        ativo: updateProductDto.ativo,
      },
      include: {
        imagens: true,
        variantes: true,
      },
    });
  }

  async remove(id: number) {
    // Verificar se o produto existe
    await this.findOne(id);

    // Remover produto
    return this.prisma.produto.delete({
      where: { id },
    });
  }

  async addImage(productId: number, createProductImageDto: CreateProductImageDto) {
    // Verificar se o produto existe
    const product = await this.findOne(productId);

    // Verificar limites de imagens baseado no nível de subscrição
    const imagesCount = await this.prisma.imagemProduto.count({
      where: { produtoId: productId },
    });

    if (product.marca.nivelSubscricao === 'BASICO' && imagesCount >= 1) {
      throw new BadRequestException('O plano Básico permite apenas 1 imagem por produto. Faça upgrade para adicionar mais imagens.');
    }

    if (product.marca.nivelSubscricao === 'PRO' && imagesCount >= 5) {
      throw new BadRequestException('O plano Pro permite apenas 5 imagens por produto. Faça upgrade para adicionar mais imagens.');
    }

    // Adicionar imagem
    return this.prisma.imagemProduto.create({
      data: {
        produtoId: productId,
        url: createProductImageDto.url,
        ordem: createProductImageDto.ordem || imagesCount,
      },
    });
  }

  async removeImage(id: number) {
    // Verificar se a imagem existe
    const image = await this.prisma.imagemProduto.findUnique({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }

    // Remover imagem
    return this.prisma.imagemProduto.delete({
      where: { id },
    });
  }

  async addVariant(productId: number, createProductVariantDto: CreateProductVariantDto) {
    // Verificar se o produto existe
    await this.findOne(productId);

    // Adicionar variante
    return this.prisma.varianteProduto.create({
      data: {
        produtoId: productId,
        nome: createProductVariantDto.nome,
        valor: createProductVariantDto.valor,
        precoAdicional: createProductVariantDto.precoAdicional || 0,
        stock: createProductVariantDto.stock || 0,
        sku: createProductVariantDto.sku,
      },
    });
  }

  async updateVariant(id: number, updateProductVariantDto: any) {
    // Verificar se a variante existe
    const variant = await this.prisma.varianteProduto.findUnique({
      where: { id },
    });

    if (!variant) {
      throw new NotFoundException(`Variante com ID ${id} não encontrada`);
    }

    // Atualizar variante
    return this.prisma.varianteProduto.update({
      where: { id },
      data: {
        nome: updateProductVariantDto.nome,
        valor: updateProductVariantDto.valor,
        precoAdicional: updateProductVariantDto.precoAdicional,
        stock: updateProductVariantDto.stock,
        sku: updateProductVariantDto.sku,
      },
    });
  }

  async removeVariant(id: number) {
    // Verificar se a variante existe
    const variant = await this.prisma.varianteProduto.findUnique({
      where: { id },
    });

    if (!variant) {
      throw new NotFoundException(`Variante com ID ${id} não encontrada`);
    }

    // Remover variante
    return this.prisma.varianteProduto.delete({
      where: { id },
    });
  }

  async getCategories() {
    const products = await this.prisma.produto.findMany({
      where: {
        ativo: true,
        categoria: {
          not: null,
        },
      },
      select: {
        categoria: true,
      },
      distinct: ['categoria'],
    });

    return products.map(product => product.categoria);
  }

  async getSubcategories(categoria: string) {
    const products = await this.prisma.produto.findMany({
      where: {
        ativo: true,
        categoria,
        subcategoria: {
          not: null,
        },
      },
      select: {
        subcategoria: true,
      },
      distinct: ['subcategoria'],
    });

    return products.map(product => product.subcategoria);
  }
}
