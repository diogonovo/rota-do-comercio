import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    // Verificar se a encomenda existe (se fornecida)
    if (createPaymentDto.encomendaId) {
      const order = await this.prisma.encomenda.findUnique({
        where: { id: createPaymentDto.encomendaId },
      });

      if (!order) {
        throw new NotFoundException(`Encomenda com ID ${createPaymentDto.encomendaId} não encontrada`);
      }
    }

    // Verificar se a marca existe (se fornecida)
    if (createPaymentDto.marcaId) {
      const brand = await this.prisma.marca.findUnique({
        where: { id: createPaymentDto.marcaId },
      });

      if (!brand) {
        throw new NotFoundException(`Marca com ID ${createPaymentDto.marcaId} não encontrada`);
      }
    }

    // Criar pagamento
    const payment = await this.prisma.pagamento.create({
      data: {
        marcaId: createPaymentDto.marcaId,
        encomendaId: createPaymentDto.encomendaId,
        tipo: createPaymentDto.tipo,
        valor: createPaymentDto.valor,
        estado: createPaymentDto.estado || 'PENDENTE',
        referenciaExterna: createPaymentDto.referenciaExterna,
        metodo: createPaymentDto.metodo,
        dataPagamento: createPaymentDto.dataPagamento,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
        encomenda: {
          select: {
            id: true,
            referencia: true,
            estado: true,
          },
        },
      },
    });

    // Se o pagamento for de uma encomenda e estiver processado, atualizar o estado da encomenda
    if (payment.encomendaId && payment.estado === 'PROCESSADO' && payment.encomenda.estado === 'PENDENTE') {
      await this.prisma.encomenda.update({
        where: { id: payment.encomendaId },
        data: {
          estado: 'PAGA',
          dataPagamento: payment.dataPagamento || new Date(),
          referenciaPagamento: payment.referenciaExterna,
          metodoPagamento: payment.metodo,
        },
      });
    }

    return payment;
  }

  async findAllPayments(query?: any) {
    const where: any = {};
    
    if (query?.tipo) {
      where.tipo = query.tipo;
    }
    
    if (query?.estado) {
      where.estado = query.estado;
    }
    
    if (query?.marcaId) {
      where.marcaId = parseInt(query.marcaId);
    }
    
    if (query?.encomendaId) {
      where.encomendaId = parseInt(query.encomendaId);
    }
    
    if (query?.metodo) {
      where.metodo = query.metodo;
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.pagamento.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          marca: {
            select: {
              id: true,
              nome: true,
            },
          },
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
            },
          },
        },
      }),
      this.prisma.pagamento.count({ where }),
    ]);

    return {
      data: payments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOnePayment(id: number) {
    const payment = await this.prisma.pagamento.findUnique({
      where: { id },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
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
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }

    return payment;
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    // Verificar se o pagamento existe
    const payment = await this.findOnePayment(id);

    // Atualizar pagamento
    const updatedPayment = await this.prisma.pagamento.update({
      where: { id },
      data: {
        estado: updatePaymentDto.estado,
        referenciaExterna: updatePaymentDto.referenciaExterna,
        dataPagamento: updatePaymentDto.dataPagamento,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
        encomenda: {
          select: {
            id: true,
            referencia: true,
            estado: true,
          },
        },
      },
    });

    // Se o pagamento for de uma encomenda e estiver processado, atualizar o estado da encomenda
    if (
      updatedPayment.encomendaId &&
      updatedPayment.estado === 'PROCESSADO' &&
      payment.encomenda.estado === 'PENDENTE'
    ) {
      await this.prisma.encomenda.update({
        where: { id: updatedPayment.encomendaId },
        data: {
          estado: 'PAGA',
          dataPagamento: updatedPayment.dataPagamento || new Date(),
          referenciaPagamento: updatedPayment.referenciaExterna,
        },
      });
    }

    return updatedPayment;
  }

  async createCommission(createCommissionDto: CreateCommissionDto) {
    // Verificar se a encomenda existe
    const order = await this.prisma.encomenda.findUnique({
      where: { id: createCommissionDto.encomendaId },
    });

    if (!order) {
      throw new NotFoundException(`Encomenda com ID ${createCommissionDto.encomendaId} não encontrada`);
    }

    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: createCommissionDto.marcaId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${createCommissionDto.marcaId} não encontrada`);
    }

    // Verificar se já existe uma comissão para esta encomenda
    const existingCommission = await this.prisma.comissao.findUnique({
      where: { encomendaId: createCommissionDto.encomendaId },
    });

    if (existingCommission) {
      throw new BadRequestException(`Já existe uma comissão para a encomenda com ID ${createCommissionDto.encomendaId}`);
    }

    // Criar comissão
    return this.prisma.comissao.create({
      data: {
        encomendaId: createCommissionDto.encomendaId,
        marcaId: createCommissionDto.marcaId,
        percentagem: createCommissionDto.percentagem,
        valor: createCommissionDto.valor,
        estado: createCommissionDto.estado || 'PENDENTE',
        dataProcessamento: createCommissionDto.dataProcessamento,
      },
      include: {
        encomenda: {
          select: {
            id: true,
            referencia: true,
            valorTotal: true,
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
  }

  async findAllCommissions(query?: any) {
    const where: any = {};
    
    if (query?.estado) {
      where.estado = query.estado;
    }
    
    if (query?.marcaId) {
      where.marcaId = parseInt(query.marcaId);
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [commissions, total] = await Promise.all([
      this.prisma.comissao.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          encomenda: {
            select: {
              id: true,
              referencia: true,
              valorTotal: true,
              estado: true,
            },
          },
          marca: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      }),
      this.prisma.comissao.count({ where }),
    ]);

    return {
      data: commissions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneCommission(id: number) {
    const commission = await this.prisma.comissao.findUnique({
      where: { id },
      include: {
        encomenda: {
          select: {
            id: true,
            referencia: true,
            valorTotal: true,
            estado: true,
            cliente: {
              select: {
                id: true,
                nome: true,
                apelido: true,
              },
            },
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

    if (!commission) {
      throw new NotFoundException(`Comissão com ID ${id} não encontrada`);
    }

    return commission;
  }

  async updateCommission(id: number, updateCommissionDto: UpdateCommissionDto) {
    // Verificar se a comissão existe
    await this.findOneCommission(id);

    // Atualizar comissão
    return this.prisma.comissao.update({
      where: { id },
      data: {
        percentagem: updateCommissionDto.percentagem,
        valor: updateCommissionDto.valor,
        estado: updateCommissionDto.estado,
        dataProcessamento: updateCommissionDto.dataProcessamento,
      },
      include: {
        encomenda: {
          select: {
            id: true,
            referencia: true,
            valorTotal: true,
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
  }

  async getCommissionsByBrand(brandId: number, query?: any) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${brandId} não encontrada`);
    }

    const where: any = {
      marcaId: brandId,
    };
    
    if (query?.estado) {
      where.estado = query.estado;
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [commissions, total] = await Promise.all([
      this.prisma.comissao.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          encomenda: {
            select: {
              id: true,
              referencia: true,
              valorTotal: true,
              estado: true,
            },
          },
        },
      }),
      this.prisma.comissao.count({ where }),
    ]);

    // Calcular totais
    const totalPending = await this.prisma.comissao.aggregate({
      where: {
        marcaId: brandId,
        estado: 'PENDENTE',
      },
      _sum: {
        valor: true,
      },
    });

    const totalProcessed = await this.prisma.comissao.aggregate({
      where: {
        marcaId: brandId,
        estado: 'PROCESSADA',
      },
      _sum: {
        valor: true,
      },
    });

    return {
      data: commissions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalPending: totalPending._sum.valor || 0,
        totalProcessed: totalProcessed._sum.valor || 0,
      },
    };
  }
}
