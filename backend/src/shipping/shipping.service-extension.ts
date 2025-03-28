import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async bulkCreateShippings(bulkCreateData: any) {
    const { orderIds, transportadoraId, estado, dataEnvio, dataEntregaEstimada } = bulkCreateData;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      throw new Error('IDs de encomendas inválidos');
    }

    if (!transportadoraId) {
      throw new Error('ID de transportadora inválido');
    }

    // Verificar se a transportadora existe
    const carrier = await this.prisma.transportadora.findUnique({
      where: { id: transportadoraId },
    });

    if (!carrier) {
      throw new Error(`Transportadora com ID ${transportadoraId} não encontrada`);
    }

    // Criar envios em massa
    const createdShippings = [];
    const errors = [];

    for (const orderId of orderIds) {
      try {
        // Verificar se a encomenda existe
        const order = await this.prisma.encomenda.findUnique({
          where: { id: parseInt(orderId) },
        });

        if (!order) {
          errors.push({ orderId, error: `Encomenda com ID ${orderId} não encontrada` });
          continue;
        }

        // Verificar se a encomenda já tem um envio
        const existingShipping = await this.prisma.envio.findUnique({
          where: { encomendaId: parseInt(orderId) },
        });

        if (existingShipping) {
          errors.push({ orderId, error: `A encomenda com ID ${orderId} já tem um envio associado` });
          continue;
        }

        // Gerar código de rastreio
        const trackingCode = `TR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // Criar envio
        const shipping = await this.prisma.envio.create({
          data: {
            encomendaId: parseInt(orderId),
            transportadoraId,
            referencia: `REF-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            estado: estado || 'AGUARDANDO_RECOLHA',
            codigoRastreio: trackingCode,
            urlRastreio: `https://rotadocomercio.pt/tracking/${trackingCode}`,
            dataEnvio: dataEnvio ? new Date(dataEnvio) : new Date(),
            dataEntregaEstimada: dataEntregaEstimada ? new Date(dataEntregaEstimada) : null,
          },
          include: {
            encomenda: {
              select: {
                id: true,
                referencia: true,
                estado: true,
              },
            },
            transportadora: true,
          },
        });

        // Atualizar estado da encomenda para ENVIADA se o estado do envio for EM_TRANSITO
        if (estado === 'EM_TRANSITO' && order.estado !== 'ENVIADA') {
          await this.prisma.encomenda.update({
            where: { id: parseInt(orderId) },
            data: {
              estado: 'ENVIADA',
            },
          });
        }

        createdShippings.push(shipping);
      } catch (error) {
        errors.push({ orderId, error: error.message });
      }
    }

    return {
      success: true,
      message: `${createdShippings.length} envios criados com sucesso`,
      createdCount: createdShippings.length,
      createdShippings,
      errors,
    };
  }

  async trackShipment(code: string) {
    // Buscar envio pelo código de rastreio
    const shipping = await this.prisma.envio.findFirst({
      where: { codigoRastreio: code },
      include: {
        encomenda: {
          select: {
            id: true,
            referencia: true,
            estado: true,
            enderecoEntrega: true,
          },
        },
        transportadora: true,
      },
    });

    if (!shipping) {
      throw new Error(`Envio com código de rastreio ${code} não encontrado`);
    }

    // Simular histórico de rastreio
    const trackingHistory = [];
    
    // Adicionar eventos com base no estado atual
    if (shipping.estado === 'AGUARDANDO_RECOLHA' || shipping.estado === 'RECOLHIDO' || 
        shipping.estado === 'EM_TRANSITO' || shipping.estado === 'ENTREGUE') {
      trackingHistory.push({
        data: shipping.dataEnvio,
        estado: 'AGUARDANDO_RECOLHA',
        descricao: 'Envio registado e aguardando recolha',
        localizacao: 'Centro de distribuição',
      });
    }
    
    if (shipping.estado === 'RECOLHIDO' || shipping.estado === 'EM_TRANSITO' || 
        shipping.estado === 'ENTREGUE') {
      const recolhaDate = new Date(shipping.dataEnvio);
      recolhaDate.setHours(recolhaDate.getHours() + 2);
      trackingHistory.push({
        data: recolhaDate,
        estado: 'RECOLHIDO',
        descricao: 'Encomenda recolhida pela transportadora',
        localizacao: 'Centro de distribuição',
      });
    }
    
    if (shipping.estado === 'EM_TRANSITO' || shipping.estado === 'ENTREGUE') {
      const transitoDate = new Date(shipping.dataEnvio);
      transitoDate.setHours(transitoDate.getHours() + 4);
      trackingHistory.push({
        data: transitoDate,
        estado: 'EM_TRANSITO',
        descricao: 'Encomenda em trânsito',
        localizacao: 'Em rota de entrega',
      });
    }
    
    if (shipping.estado === 'ENTREGUE') {
      trackingHistory.push({
        data: shipping.dataEntregaReal || new Date(),
        estado: 'ENTREGUE',
        descricao: 'Encomenda entregue com sucesso',
        localizacao: shipping.encomenda.enderecoEntrega ? 
          `${shipping.encomenda.enderecoEntrega.cidade}, ${shipping.encomenda.enderecoEntrega.codigoPostal}` : 
          'Endereço de entrega',
      });
    }

    return {
      envio: {
        id: shipping.id,
        codigoRastreio: shipping.codigoRastreio,
        estado: shipping.estado,
        dataEnvio: shipping.dataEnvio,
        dataEntregaEstimada: shipping.dataEntregaEstimada,
        dataEntregaReal: shipping.dataEntregaReal,
      },
      encomenda: {
        id: shipping.encomenda.id,
        referencia: shipping.encomenda.referencia,
      },
      transportadora: {
        id: shipping.transportadora.id,
        nome: shipping.transportadora.nome,
      },
      historicoRastreio: trackingHistory,
    };
  }

  async getShippingAnalytics(brandId: number, query: any) {
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

    // Buscar encomendas da marca
    const orders = await this.prisma.encomenda.findMany({
      where: {
        marcaId: brandId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
      },
    });

    const orderIds = orders.map(order => order.id);

    // Buscar envios
    const shippings = await this.prisma.envio.findMany({
      where: {
        encomendaId: {
          in: orderIds,
        },
      },
      include: {
        transportadora: true,
      },
    });

    // Análise por estado
    const shippingsByStatus = {};
    shippings.forEach(shipping => {
      if (shippingsByStatus[shipping.estado]) {
        shippingsByStatus[shipping.estado]++;
      } else {
        shippingsByStatus[shipping.estado] = 1;
      }
    });

    // Análise por transportadora
    const shippingsByCarrier = {};
    shippings.forEach(shipping => {
      const carrierId = shipping.transportadoraId;
      if (shippingsByCarrier[carrierId]) {
        shippingsByCarrier[carrierId].count++;
      } else {
        shippingsByCarrier[carrierId] = {
          transportadora: shipping.transportadora,
          count: 1,
        };
      }
    });

    // Tempo médio de entrega
    const deliveredShippings = shippings.filter(shipping => 
      shipping.estado === 'ENTREGUE' && shipping.dataEnvio && shipping.dataEntregaReal
    );
    
    let avgDeliveryTime = 0;
    if (deliveredShippings.length > 0) {
      const totalDeliveryTime = deliveredShippings.reduce((sum, shipping) => {
        const envioDate = new Date(shipping.dataEnvio);
        const entregaDate = new Date(shipping.dataEntregaReal);
        const diffTime = Math.abs(entregaDate.getTime() - envioDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      avgDeliveryTime = totalDeliveryTime / deliveredShippings.length;
    }

    return {
      periodo: {
        inicio: startDate,
        fim: endDate,
      },
      metricas: {
        totalEnvios: shippings.length,
        enviosEntregues: deliveredShippings.length,
        tempoMedioEntrega: avgDeliveryTime,
      },
      enviosPorEstado: shippingsByStatus,
      enviosPorTransportadora: Object.values(shippingsByCarrier),
    };
  }

  async setCustomShippingRates(customRatesData: any) {
    const { brandId, rates } = customRatesData;

    if (!brandId) {
      throw new Error('ID de marca inválido');
    }

    if (!rates || !Array.isArray(rates) || rates.length === 0) {
      throw new Error('Taxas de envio inválidas');
    }

    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new Error(`Marca com ID ${brandId} não encontrada`);
    }

    // Verificar se a marca tem nível PREMIUM
    if (brand.nivelSubscricao !== 'PREMIUM') {
      throw new Error('Apenas marcas com nível PREMIUM podem configurar taxas de envio personalizadas');
    }

    // Salvar taxas de envio personalizadas
    // Nota: Este é um exemplo simplificado. Em um sistema real, seria necessário
    // implementar uma tabela de taxas de envio personalizadas no banco de dados.
    return {
      success: true,
      message: 'Taxas de envio personalizadas configuradas com sucesso',
      brandId,
      rates,
    };
  }
}
