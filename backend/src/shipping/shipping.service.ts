import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async createShipping(createShippingDto: CreateShippingDto) {
    // Verificar se a encomenda existe
    const order = await this.prisma.encomenda.findUnique({
      where: { id: createShippingDto.encomendaId },
    });

    if (!order) {
      throw new NotFoundException(`Encomenda com ID ${createShippingDto.encomendaId} não encontrada`);
    }

    // Verificar se a encomenda já tem um envio
    const existingShipping = await this.prisma.envio.findUnique({
      where: { encomendaId: createShippingDto.encomendaId },
    });

    if (existingShipping) {
      throw new BadRequestException(`A encomenda com ID ${createShippingDto.encomendaId} já tem um envio associado`);
    }

    // Verificar se a transportadora existe
    const carrier = await this.prisma.transportadora.findUnique({
      where: { id: createShippingDto.transportadoraId },
    });

    if (!carrier) {
      throw new NotFoundException(`Transportadora com ID ${createShippingDto.transportadoraId} não encontrada`);
    }

    // Criar envio
    const shipping = await this.prisma.envio.create({
      data: {
        encomendaId: createShippingDto.encomendaId,
        transportadoraId: createShippingDto.transportadoraId,
        referencia: createShippingDto.referencia,
        estado: createShippingDto.estado || 'AGUARDANDO_RECOLHA',
        codigoRastreio: createShippingDto.codigoRastreio,
        urlRastreio: createShippingDto.urlRastreio,
        dataEnvio: createShippingDto.dataEnvio,
        dataEntregaEstimada: createShippingDto.dataEntregaEstimada,
        dataEntregaReal: createShippingDto.dataEntregaReal,
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
    if (createShippingDto.estado === 'EM_TRANSITO' && order.estado !== 'ENVIADA') {
      await this.prisma.encomenda.update({
        where: { id: createShippingDto.encomendaId },
        data: {
          estado: 'ENVIADA',
        },
      });
    }

    // Atualizar estado da encomenda para ENTREGUE se o estado do envio for ENTREGUE
    if (createShippingDto.estado === 'ENTREGUE' && order.estado !== 'ENTREGUE') {
      await this.prisma.encomenda.update({
        where: { id: createShippingDto.encomendaId },
        data: {
          estado: 'ENTREGUE',
        },
      });
    }

    return shipping;
  }

  async findAllShippings(query?: any) {
    const where: any = {};
    
    if (query?.estado) {
      where.estado = query.estado;
    }
    
    if (query?.transportadoraId) {
      where.transportadoraId = parseInt(query.transportadoraId);
    }
    
    if (query?.encomendaId) {
      where.encomendaId = parseInt(query.encomendaId);
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [shippings, total] = await Promise.all([
      this.prisma.envio.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          encomenda: {
            select: {
              id: true,
              referencia: true,
              estado: true,
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
          },
          transportadora: true,
        },
      }),
      this.prisma.envio.count({ where }),
    ]);

    return {
      data: shippings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneShipping(id: number) {
    const shipping = await this.prisma.envio.findUnique({
      where: { id },
      include: {
        encomenda: {
          select: {
            id: true,
            referencia: true,
            estado: true,
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
            enderecoEntrega: true,
          },
        },
        transportadora: true,
      },
    });

    if (!shipping) {
      throw new NotFoundException(`Envio com ID ${id} não encontrado`);
    }

    return shipping;
  }

  async findShippingByOrderId(orderId: number) {
    const shipping = await this.prisma.envio.findUnique({
      where: { encomendaId: orderId },
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

    if (!shipping) {
      throw new NotFoundException(`Envio para a encomenda com ID ${orderId} não encontrado`);
    }

    return shipping;
  }

  async updateShipping(id: number, updateShippingDto: UpdateShippingDto) {
    // Verificar se o envio existe
    const shipping = await this.findOneShipping(id);

    // Atualizar envio
    const updatedShipping = await this.prisma.envio.update({
      where: { id },
      data: {
        transportadoraId: updateShippingDto.transportadoraId,
        referencia: updateShippingDto.referencia,
        estado: updateShippingDto.estado,
        codigoRastreio: updateShippingDto.codigoRastreio,
        urlRastreio: updateShippingDto.urlRastreio,
        dataEnvio: updateShippingDto.dataEnvio,
        dataEntregaEstimada: updateShippingDto.dataEntregaEstimada,
        dataEntregaReal: updateShippingDto.dataEntregaReal,
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

    // Atualizar estado da encomenda se necessário
    if (updateShippingDto.estado === 'EM_TRANSITO' && shipping.encomenda.estado !== 'ENVIADA') {
      await this.prisma.encomenda.update({
        where: { id: shipping.encomendaId },
        data: {
          estado: 'ENVIADA',
        },
      });
    }

    if (updateShippingDto.estado === 'ENTREGUE' && shipping.encomenda.estado !== 'ENTREGUE') {
      await this.prisma.encomenda.update({
        where: { id: shipping.encomendaId },
        data: {
          estado: 'ENTREGUE',
        },
      });
    }

    return updatedShipping;
  }

  async createCarrier(createCarrierDto: CreateCarrierDto) {
    // Verificar se já existe uma transportadora com o mesmo código
    const existingCarrier = await this.prisma.transportadora.findUnique({
      where: { codigo: createCarrierDto.codigo },
    });

    if (existingCarrier) {
      throw new BadRequestException(`Já existe uma transportadora com o código ${createCarrierDto.codigo}`);
    }

    // Criar transportadora
    return this.prisma.transportadora.create({
      data: {
        nome: createCarrierDto.nome,
        codigo: createCarrierDto.codigo,
        apiKey: createCarrierDto.apiKey,
        ativa: createCarrierDto.ativa !== undefined ? createCarrierDto.ativa : true,
      },
    });
  }

  async findAllCarriers(query?: any) {
    const where: any = {};
    
    if (query?.ativa !== undefined) {
      where.ativa = query.ativa === 'true';
    }

    return this.prisma.transportadora.findMany({
      where,
      orderBy: { nome: 'asc' },
    });
  }

  async findOneCarrier(id: number) {
    const carrier = await this.prisma.transportadora.findUnique({
      where: { id },
    });

    if (!carrier) {
      throw new NotFoundException(`Transportadora com ID ${id} não encontrada`);
    }

    return carrier;
  }

  async updateCarrier(id: number, updateCarrierDto: UpdateCarrierDto) {
    // Verificar se a transportadora existe
    await this.findOneCarrier(id);

    // Verificar se já existe outra transportadora com o mesmo código
    if (updateCarrierDto.codigo) {
      const existingCarrier = await this.prisma.transportadora.findFirst({
        where: {
          codigo: updateCarrierDto.codigo,
          id: { not: id },
        },
      });

      if (existingCarrier) {
        throw new BadRequestException(`Já existe uma transportadora com o código ${updateCarrierDto.codigo}`);
      }
    }

    // Atualizar transportadora
    return this.prisma.transportadora.update({
      where: { id },
      data: {
        nome: updateCarrierDto.nome,
        codigo: updateCarrierDto.codigo,
        apiKey: updateCarrierDto.apiKey,
        ativa: updateCarrierDto.ativa,
      },
    });
  }

  async removeCarrier(id: number) {
    // Verificar se a transportadora existe
    await this.findOneCarrier(id);

    // Verificar se a transportadora está sendo usada em algum envio
    const shippingsCount = await this.prisma.envio.count({
      where: { transportadoraId: id },
    });

    if (shippingsCount > 0) {
      throw new BadRequestException(`Não é possível remover a transportadora pois ela está associada a ${shippingsCount} envios`);
    }

    // Remover transportadora
    return this.prisma.transportadora.delete({
      where: { id },
    });
  }
}
