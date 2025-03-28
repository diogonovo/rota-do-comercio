import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    // Verificar se o cliente existe
    const client = await this.prisma.cliente.findUnique({
      where: { id: createOrderDto.clienteId },
      include: {
        enderecos: true,
      },
    });

    if (!client) {
      throw new NotFoundException(`Cliente com ID ${createOrderDto.clienteId} não encontrado`);
    }

    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: createOrderDto.marcaId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${createOrderDto.marcaId} não encontrada`);
    }

    // Verificar se os endereços existem
    if (createOrderDto.enderecoEntregaId) {
      const deliveryAddress = client.enderecos.find(
        (address) => address.id === createOrderDto.enderecoEntregaId,
      );
      if (!deliveryAddress) {
        throw new NotFoundException(
          `Endereço de entrega com ID ${createOrderDto.enderecoEntregaId} não encontrado`,
        );
      }
    }

    if (createOrderDto.enderecoFaturacaoId) {
      const billingAddress = client.enderecos.find(
        (address) => address.id === createOrderDto.enderecoFaturacaoId,
      );
      if (!billingAddress) {
        throw new NotFoundException(
          `Endereço de faturação com ID ${createOrderDto.enderecoFaturacaoId} não encontrado`,
        );
      }
    }

    // Gerar referência única para a encomenda
    const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Criar encomenda
    const order = await this.prisma.encomenda.create({
      data: {
        clienteId: createOrderDto.clienteId,
        marcaId: createOrderDto.marcaId,
        referencia: reference,
        valorProdutos: createOrderDto.valorProdutos,
        valorEnvio: createOrderDto.valorEnvio,
        valorTotal: createOrderDto.valorTotal,
        estado: createOrderDto.estado || 'PENDENTE',
        metodoPagamento: createOrderDto.metodoPagamento,
        referenciaPagamento: createOrderDto.referenciaPagamento,
        dataPagamento: createOrderDto.dataPagamento,
        enderecoEntregaId: createOrderDto.enderecoEntregaId,
        enderecoFaturacaoId: createOrderDto.enderecoFaturacaoId,
      },
    });

    // Calcular comissão baseada no nível de subscrição da marca
    let commissionPercentage = 10; // Padrão para BASICO
    if (brand.nivelSubscricao === 'PRO') {
      commissionPercentage = 8;
    } else if (brand.nivelSubscricao === 'PREMIUM') {
      commissionPercentage = 5;
    }

    const commissionValue = (createOrderDto.valorProdutos * commissionPercentage) / 100;

    // Criar comissão
    await this.prisma.comissao.create({
      data: {
        encomendaId: order.id,
        marcaId: createOrderDto.marcaId,
        percentagem: commissionPercentage,
        valor: commissionValue,
        estado: 'PENDENTE',
      },
    });

    return order;
  }

  async findAll(query?: any) {
    const where: any = {};
    
    if (query?.clienteId) {
      where.clienteId = parseInt(query.clienteId);
    }
    
    if (query?.marcaId) {
      where.marcaId = parseInt(query.marcaId);
    }
    
    if (query?.estado) {
      where.estado = query.estado;
    }
    
    if (query?.referencia) {
      where.referencia = { contains: query.referencia };
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.encomenda.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          cliente: {
            select: {
              id: true,
              nome: true,
              apelido: true,
              utilizador: {
                select: {
                  email: true,
                },
              },
            },
          },
          marca: {
            select: {
              id: true,
              nome: true,
              logoUrl: true,
            },
          },
          enderecoEntrega: true,
          enderecoFaturacao: true,
          itens: {
            include: {
              produto: {
                select: {
                  id: true,
                  nome: true,
                  imagens: {
                    take: 1,
                  },
                },
              },
              variante: true,
            },
          },
          envio: {
            include: {
              transportadora: true,
            },
          },
        },
      }),
      this.prisma.encomenda.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const order = await this.prisma.encomenda.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            apelido: true,
            telefone: true,
            utilizador: {
              select: {
                email: true,
              },
            },
          },
        },
        marca: {
          select: {
            id: true,
            nome: true,
            logoUrl: true,
            contacto: true,
          },
        },
        enderecoEntrega: true,
        enderecoFaturacao: true,
        itens: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
                imagens: {
                  take: 1,
                },
              },
            },
            variante: true,
          },
        },
        envio: {
          include: {
            transportadora: true,
          },
        },
        pagamentos: true,
        comissao: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Encomenda com ID ${id} não encontrada`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    // Verificar se a encomenda existe
    await this.findOne(id);

    // Atualizar encomenda
    return this.prisma.encomenda.update({
      where: { id },
      data: {
        estado: updateOrderDto.estado,
        metodoPagamento: updateOrderDto.metodoPagamento,
        referenciaPagamento: updateOrderDto.referenciaPagamento,
        dataPagamento: updateOrderDto.dataPagamento,
        enderecoEntregaId: updateOrderDto.enderecoEntregaId,
        enderecoFaturacaoId: updateOrderDto.enderecoFaturacaoId,
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            apelido: true,
          },
        },
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
        itens: {
          include: {
            produto: true,
            variante: true,
          },
        },
        envio: {
          include: {
            transportadora: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    // Verificar se a encomenda existe
    const order = await this.findOne(id);

    // Validar transição de estado
    const validTransitions = {
      PENDENTE: ['PAGA', 'CANCELADA'],
      PAGA: ['PROCESSANDO', 'CANCELADA'],
      PROCESSANDO: ['ENVIADA', 'CANCELADA'],
      ENVIADA: ['ENTREGUE', 'CANCELADA'],
      ENTREGUE: [],
      CANCELADA: [],
    };

    if (!validTransitions[order.estado].includes(updateOrderStatusDto.estado)) {
      throw new BadRequestException(
        `Transição de estado inválida: ${order.estado} -> ${updateOrderStatusDto.estado}`,
      );
    }

    // Atualizar estado da encomenda
    const updatedOrder = await this.prisma.encomenda.update({
      where: { id },
      data: {
        estado: updateOrderStatusDto.estado,
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            apelido: true,
          },
        },
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Se o estado for PAGA, atualizar a data de pagamento
    if (updateOrderStatusDto.estado === 'PAGA' && !order.dataPagamento) {
      await this.prisma.encomenda.update({
        where: { id },
        data: {
          dataPagamento: new Date(),
        },
      });
    }

    // Se o estado for CANCELADA, atualizar o estado da comissão
    if (updateOrderStatusDto.estado === 'CANCELADA') {
      await this.prisma.comissao.updateMany({
        where: { encomendaId: id },
        data: {
          estado: 'CANCELADA',
        },
      });
    }

    return updatedOrder;
  }

  async addItem(id: number, createOrderItemDto: CreateOrderItemDto) {
    // Verificar se a encomenda existe
    const order = await this.findOne(id);

    // Verificar se o produto existe
    const product = await this.prisma.produto.findUnique({
      where: { id: createOrderItemDto.produtoId },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${createOrderItemDto.produtoId} não encontrado`);
    }

    // Verificar se a variante existe (se fornecida)
    if (createOrderItemDto.varianteId) {
      const variant = await this.prisma.varianteProduto.findUnique({
        where: { id: createOrderItemDto.varianteId },
      });

      if (!variant) {
        throw new NotFoundException(`Variante com ID ${createOrderItemDto.varianteId} não encontrada`);
      }

      // Verificar se a variante pertence ao produto
      if (variant.produtoId !== createOrderItemDto.produtoId) {
        throw new BadRequestException(`A variante não pertence ao produto especificado`);
      }
    }

    // Calcular preço unitário e total
    let unitPrice = product.precoPromocional || product.preco;
    
    if (createOrderItemDto.varianteId) {
      const variant = await this.prisma.varianteProduto.findUnique({
        where: { id: createOrderItemDto.varianteId },
      });
      unitPrice += variant.precoAdicional;
    }
    
    const totalPrice = unitPrice * createOrderItemDto.quantidade;

    // Adicionar item à encomenda
    const orderItem = await this.prisma.itemEncomenda.create({
      data: {
        encomendaId: id,
        produtoId: createOrderItemDto.produtoId,
        varianteId: createOrderItemDto.varianteId,
        quantidade: createOrderItemDto.quantidade,
        precoUnitario: unitPrice,
        precoTotal: totalPrice,
      },
      include: {
        produto: true,
        variante: true,
      },
    });

    // Atualizar valores da encomenda
    const orderItems = await this.prisma.itemEncomenda.findMany({
      where: { encomendaId: id },
    });

    const valorProdutos = orderItems.reduce((sum, item) => sum + item.precoTotal, 0);
    const valorTotal = valorProdutos + order.valorEnvio;

    await this.prisma.encomenda.update({
      where: { id },
      data: {
        valorProdutos,
        valorTotal,
      },
    });

    // Atualizar valor da comissão
    const brand = await this.prisma.marca.findUnique({
      where: { id: order.marcaId },
    });

    let commissionPercentage = 10; // Padrão para BASICO
    if (brand.nivelSubscricao === 'PRO') {
      commissionPercentage = 8;
    } else if (brand.nivelSubscricao === 'PREMIUM') {
      commissionPercentage = 5;
    }

    const commissionValue = (valorProdutos * commissionPercentage) / 100;

    await this.prisma.comissao.updateMany({
      where: { encomendaId: id },
      data: {
        valor: commissionValue,
      },
    });

    return orderItem;
  }

  async removeItem(orderId: number, itemId: number) {
    // Verificar se a encomenda existe
    const order = await this.findOne(orderId);

    // Verificar se o item existe
    const item = await this.prisma.itemEncomenda.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item com ID ${itemId} não encontrado`);
    }

    if (item.encomendaId !== orderId) {
      throw new BadRequestException(`O item não pertence à encomenda especificada`);
    }

    // Remover item
    await this.prisma.itemEncomenda.delete({
      where: { id: itemId },
    });

    // Atualizar valores da encomenda
    const orderItems = await this.prisma.itemEncomenda.findMany({
      where: { encomendaId: orderId },
    });

    const valorProdutos = orderItems.reduce((sum, item) => sum + item.precoTotal, 0);
    const valorTotal = valorProdutos + order.valorEnvio;

    await this.prisma.encomenda.update({
      where: { id: orderId },
      data: {
        valorProdutos,
        valorTotal,
      },
    });

    // Atualizar valor da comissão
    const brand = await this.prisma.marca.findUnique({
      where: { id: order.marcaId },
    });

    let commissionPercentage = 10; // Padrão para BASICO
    if (brand.nivelSubscricao === 'PRO') {
      commissionPercentage = 8;
    } else if (brand.nivelSubscricao === 'PREMIUM') {
      commissionPercentage = 5;
    }

    const commissionValue = (valorProdutos * commissionPercentage) / 100;

    await this.prisma.comissao.updateMany({
      where: { encomendaId: orderId },
      data: {
        valor: commissionValue,
      },
    });

    return { success: true, message: 'Item removido com sucesso' };
  }
}
