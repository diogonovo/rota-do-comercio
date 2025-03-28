import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionPlanDto } from './dto/subscription-plan.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  // Planos de subscrição disponíveis
  private subscriptionPlans = {
    BASICO: {
      nivel: 'BASICO',
      valorMensal: 19.99,
      valorAnual: 199.99,
      descricao: 'Plano básico para pequenas marcas',
      beneficios: [
        'Até 50 produtos',
        '1 imagem por produto',
        'Comissão de 10% por venda',
        'Suporte por email',
        'Relatórios básicos',
      ],
      limitacoes: {
        maxProdutos: 50,
        maxImagensPorProduto: 1,
        comissao: 10,
      },
    },
    PRO: {
      nivel: 'PRO',
      valorMensal: 49.99,
      valorAnual: 499.99,
      descricao: 'Plano profissional para marcas em crescimento',
      beneficios: [
        'Até 200 produtos',
        '5 imagens por produto',
        'Comissão de 8% por venda',
        'Suporte prioritário',
        'Relatórios avançados',
        'Destaque na página inicial',
      ],
      limitacoes: {
        maxProdutos: 200,
        maxImagensPorProduto: 5,
        comissao: 8,
      },
    },
    PREMIUM: {
      nivel: 'PREMIUM',
      valorMensal: 99.99,
      valorAnual: 999.99,
      descricao: 'Plano premium para marcas estabelecidas',
      beneficios: [
        'Produtos ilimitados',
        'Imagens ilimitadas por produto',
        'Comissão de 5% por venda',
        'Suporte dedicado',
        'Relatórios personalizados',
        'Destaque na página inicial',
        'Campanhas de marketing',
        'Integração com sistemas externos',
      ],
      limitacoes: {
        maxProdutos: -1, // ilimitado
        maxImagensPorProduto: -1, // ilimitado
        comissao: 5,
      },
    },
  };

  getSubscriptionPlans(): SubscriptionPlanDto[] {
    return Object.values(this.subscriptionPlans);
  }

  getSubscriptionPlan(nivel: string): SubscriptionPlanDto {
    const plan = this.subscriptionPlans[nivel];
    if (!plan) {
      throw new NotFoundException(`Plano de subscrição ${nivel} não encontrado`);
    }
    return plan;
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    // Verificar se a marca existe
    const brand = await this.prisma.marca.findUnique({
      where: { id: createSubscriptionDto.marcaId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID ${createSubscriptionDto.marcaId} não encontrada`);
    }

    // Verificar se a marca já tem uma subscrição
    const existingSubscription = await this.prisma.subscricao.findUnique({
      where: { marcaId: createSubscriptionDto.marcaId },
    });

    if (existingSubscription) {
      throw new BadRequestException(`A marca com ID ${createSubscriptionDto.marcaId} já tem uma subscrição ativa`);
    }

    // Verificar se o nível de subscrição é válido
    if (!this.subscriptionPlans[createSubscriptionDto.nivel]) {
      throw new BadRequestException(`Nível de subscrição ${createSubscriptionDto.nivel} inválido`);
    }

    // Obter valores do plano
    const plan = this.subscriptionPlans[createSubscriptionDto.nivel];
    
    // Calcular data de fim baseada na periodicidade
    const dataInicio = createSubscriptionDto.dataInicio || new Date();
    let dataFim = null;
    
    if (createSubscriptionDto.periodicidade === 'MENSAL') {
      dataFim = new Date(dataInicio);
      dataFim.setMonth(dataFim.getMonth() + 1);
    } else if (createSubscriptionDto.periodicidade === 'ANUAL') {
      dataFim = new Date(dataInicio);
      dataFim.setFullYear(dataFim.getFullYear() + 1);
    }

    // Criar subscrição
    const subscription = await this.prisma.subscricao.create({
      data: {
        marcaId: createSubscriptionDto.marcaId,
        nivel: createSubscriptionDto.nivel,
        valorMensal: createSubscriptionDto.valorMensal || plan.valorMensal,
        valorAnual: createSubscriptionDto.valorAnual || plan.valorAnual,
        periodicidade: createSubscriptionDto.periodicidade,
        estado: createSubscriptionDto.estado || 'ATIVA',
        dataInicio,
        dataFim,
        metodoPagamento: createSubscriptionDto.metodoPagamento,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Atualizar nível de subscrição da marca
    await this.prisma.marca.update({
      where: { id: createSubscriptionDto.marcaId },
      data: {
        nivelSubscricao: createSubscriptionDto.nivel,
        dataRenovacao: dataFim,
      },
    });

    // Criar pagamento se necessário
    if (createSubscriptionDto.criarPagamento) {
      const valorPagamento = createSubscriptionDto.periodicidade === 'MENSAL' 
        ? subscription.valorMensal 
        : subscription.valorAnual;
      
      await this.prisma.pagamento.create({
        data: {
          marcaId: createSubscriptionDto.marcaId,
          tipo: 'SUBSCRICAO',
          valor: valorPagamento,
          estado: 'PROCESSADO',
          metodo: createSubscriptionDto.metodoPagamento,
          dataPagamento: new Date(),
        },
      });
    }

    return subscription;
  }

  async findAll(query?: any) {
    const where: any = {};
    
    if (query?.nivel) {
      where.nivel = query.nivel;
    }
    
    if (query?.estado) {
      where.estado = query.estado;
    }
    
    if (query?.periodicidade) {
      where.periodicidade = query.periodicidade;
    }
    
    if (query?.marcaId) {
      where.marcaId = parseInt(query.marcaId);
    }

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    const [subscriptions, total] = await Promise.all([
      this.prisma.subscricao.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          marca: {
            select: {
              id: true,
              nome: true,
              logoUrl: true,
            },
          },
        },
      }),
      this.prisma.subscricao.count({ where }),
    ]);

    return {
      data: subscriptions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const subscription = await this.prisma.subscricao.findUnique({
      where: { id },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
            logoUrl: true,
            contacto: true,
            utilizador: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscrição com ID ${id} não encontrada`);
    }

    return subscription;
  }

  async findByBrandId(brandId: number) {
    const subscription = await this.prisma.subscricao.findUnique({
      where: { marcaId: brandId },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscrição para a marca com ID ${brandId} não encontrada`);
    }

    return subscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    // Verificar se a subscrição existe
    const subscription = await this.findOne(id);

    // Verificar se o nível de subscrição é válido
    if (updateSubscriptionDto.nivel && !this.subscriptionPlans[updateSubscriptionDto.nivel]) {
      throw new BadRequestException(`Nível de subscrição ${updateSubscriptionDto.nivel} inválido`);
    }

    // Calcular nova data de fim se a periodicidade mudar
    let dataFim = subscription.dataFim;
    
    if (updateSubscriptionDto.periodicidade && updateSubscriptionDto.periodicidade !== subscription.periodicidade) {
      const dataInicio = new Date();
      
      if (updateSubscriptionDto.periodicidade === 'MENSAL') {
        dataFim = new Date(dataInicio);
        dataFim.setMonth(dataFim.getMonth() + 1);
      } else if (updateSubscriptionDto.periodicidade === 'ANUAL') {
        dataFim = new Date(dataInicio);
        dataFim.setFullYear(dataFim.getFullYear() + 1);
      }
    }

    // Atualizar subscrição
    const updatedSubscription = await this.prisma.subscricao.update({
      where: { id },
      data: {
        nivel: updateSubscriptionDto.nivel,
        valorMensal: updateSubscriptionDto.valorMensal,
        valorAnual: updateSubscriptionDto.valorAnual,
        periodicidade: updateSubscriptionDto.periodicidade,
        estado: updateSubscriptionDto.estado,
        dataInicio: updateSubscriptionDto.dataInicio,
        dataFim: updateSubscriptionDto.dataFim || dataFim,
        metodoPagamento: updateSubscriptionDto.metodoPagamento,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Atualizar nível de subscrição da marca se necessário
    if (updateSubscriptionDto.nivel && updateSubscriptionDto.nivel !== subscription.nivel) {
      await this.prisma.marca.update({
        where: { id: subscription.marcaId },
        data: {
          nivelSubscricao: updateSubscriptionDto.nivel,
          dataRenovacao: updateSubscriptionDto.dataFim || dataFim,
        },
      });
    }

    return updatedSubscription;
  }

  async renew(id: number) {
    // Verificar se a subscrição existe
    const subscription = await this.findOne(id);

    // Calcular nova data de fim
    const dataInicio = new Date();
    let dataFim = new Date(dataInicio);
    
    if (subscription.periodicidade === 'MENSAL') {
      dataFim.setMonth(dataFim.getMonth() + 1);
    } else if (subscription.periodicidade === 'ANUAL') {
      dataFim.setFullYear(dataFim.getFullYear() + 1);
    }

    // Atualizar subscrição
    const renewedSubscription = await this.prisma.subscricao.update({
      where: { id },
      data: {
        estado: 'ATIVA',
        dataInicio,
        dataFim,
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Atualizar data de renovação da marca
    await this.prisma.marca.update({
      where: { id: subscription.marcaId },
      data: {
        dataRenovacao: dataFim,
      },
    });

    // Criar pagamento
    const valorPagamento = subscription.periodicidade === 'MENSAL' 
      ? subscription.valorMensal 
      : subscription.valorAnual;
    
    await this.prisma.pagamento.create({
      data: {
        marcaId: subscription.marcaId,
        tipo: 'SUBSCRICAO',
        valor: valorPagamento,
        estado: 'PROCESSADO',
        metodo: subscription.metodoPagamento,
        dataPagamento: new Date(),
      },
    });

    return renewedSubscription;
  }

  async cancel(id: number) {
    // Verificar se a subscrição existe
    const subscription = await this.findOne(id);

    // Atualizar subscrição
    const canceledSubscription = await this.prisma.subscricao.update({
      where: { id },
      data: {
        estado: 'CANCELADA',
      },
      include: {
        marca: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return canceledSubscription;
  }

  async checkExpiredSubscriptions() {
    const today = new Date();
    
    // Encontrar subscrições expiradas
    const expiredSubscriptions = await this.prisma.subscricao.findMany({
      where: {
        estado: 'ATIVA',
        dataFim: {
          lt: today,
        },
      },
      include: {
        marca: true,
      },
    });

    // Atualizar estado das subscrições expiradas
    for (const subscription of expiredSubscriptions) {
      await this.prisma.subscricao.update({
        where: { id: subscription.id },
        data: {
          estado: 'INATIVA',
        },
      });

      // Rebaixar marca para nível básico se a subscrição expirou
      if (subscription.marca.nivelSubscricao !== 'BASICO') {
        await this.prisma.marca.update({
          where: { id: subscription.marcaId },
          data: {
            nivelSubscricao: 'BASICO',
          },
        });
      }
    }

    return {
      expiredCount: expiredSubscriptions.length,
      expiredSubscriptions,
    };
  }
}
