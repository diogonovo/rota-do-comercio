import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersServiceExt {
  constructor(private prisma: PrismaService) {}

  async getOrderAnalytics(brandId: number, query: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${brandId} não encontrada`);
    }

    // Período de análise
    const startDate = query.startDate ? new Date(query.startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const endDate = query.endDate ? new Date(query.endDate) : new Date();

    // Buscar encomendas
    const orders = await this.prisma.encomenda.findMany({
      where: {
        marcaId: brandId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            apelido: true,
          },
        },
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    // Calcular métricas
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.valorTotal, 0);
    
    // Análise por estado
    const ordersByStatus = {};
    orders.forEach(order => {
      if (ordersByStatus[order.estado]) {
        ordersByStatus[order.estado]++;
      } else {
        ordersByStatus[order.estado] = 1;
      }
    });

    // Análise por cliente
    const ordersByCustomer = {};
    orders.forEach(order => {
      const customerId = order.clienteId;
      if (ordersByCustomer[customerId]) {
        ordersByCustomer[customerId].count++;
        ordersByCustomer[customerId].total += order.valorTotal;
      } else {
        ordersByCustomer[customerId] = {
          cliente: order.cliente,
          count: 1,
          total: order.valorTotal,
        };
      }
    });

    // Top clientes
    const topCustomers = Object.values(ordersByCustomer)
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 5);

    // Análise por produto
    const ordersByProduct = {};
    orders.forEach(order => {
      order.itens.forEach(item => {
        const productId = item.produtoId;
        if (ordersByProduct[productId]) {
          ordersByProduct[productId].quantity += item.quantidade;
          ordersByProduct[productId].total += item.precoTotal;
        } else {
          ordersByProduct[productId] = {
            produto: item.produto,
            quantity: item.quantidade,
            total: item.precoTotal,
          };
        }
      });
    });

    // Top produtos
    const topProducts = Object.values(ordersByProduct)
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 5);

    // Retornar analytics
    return {
      periodo: {
        inicio: startDate,
        fim: endDate,
      },
      metricas: {
        totalEncomendas: totalOrders,
        receitaTotal: totalRevenue,
        mediaValorEncomenda: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      },
      encomendasPorEstado: ordersByStatus,
      topClientes: topCustomers,
      topProdutos: topProducts,
    };
  }

  async bulkUpdateOrders(bulkUpdateData: any) {
    const { orderIds, status } = bulkUpdateData;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      throw new Error('IDs de encomendas inválidos');
    }

    if (!status) {
      throw new Error('Estado inválido');
    }

    // Atualizar encomendas em massa
    const result = await this.prisma.encomenda.updateMany({
      where: {
        id: {
          in: orderIds.map(id => parseInt(id)),
        },
      },
      data: {
        estado: status,
      },
    });

    return {
      success: true,
      message: `${result.count} encomendas atualizadas com sucesso`,
      updatedCount: result.count,
    };
  }

  async exportOrders(brandId: number, query: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${brandId} não encontrada`);
    }

    // Filtros
    const where: any = {
      marcaId: brandId,
    };

    if (query.status) {
      where.estado = query.status;
    }

    if (query.startDate && query.endDate) {
      where.createdAt = {
        gte: new Date(query.startDate),
        lte: new Date(query.endDate),
      };
    }

    // Buscar encomendas
    const orders = await this.prisma.encomenda.findMany({
      where,
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
            telefone: true,
          },
        },
        itens: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
                sku: true,
              },
            },
          },
        },
        enderecoEntrega: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Formatar dados para exportação
    const exportData = orders.map(order => {
      return {
        id: order.id,
        referencia: order.referencia,
        data: order.createdAt,
        estado: order.estado,
        cliente: `${order.cliente.nome} ${order.cliente.apelido}`,
        email: order.cliente.utilizador.email,
        telefone: order.cliente.telefone,
        valorProdutos: order.valorProdutos,
        valorEnvio: order.valorEnvio,
        valorTotal: order.valorTotal,
        produtos: order.itens.map(item => `${item.produto.nome} (${item.quantidade}x)`).join(', '),
        enderecoEntrega: order.enderecoEntrega ? 
          `${order.enderecoEntrega.rua}, ${order.enderecoEntrega.numero}, ${order.enderecoEntrega.codigoPostal} ${order.enderecoEntrega.cidade}` : 
          'N/A',
      };
    });

    return {
      success: true,
      data: exportData,
      format: query.format || 'json',
      fileName: `encomendas_${brandId}_${new Date().toISOString().split('T')[0]}.${query.format || 'json'}`,
    };
  }
}
