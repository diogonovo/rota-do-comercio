import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    
    // Limpar todas as tabelas para testes
    const models = Object.keys(this).filter(key =>
      !key.startsWith('_') &&
      !['$connect', '$disconnect', '$on', '$transaction', '$use'].includes(key)
    );
    

    return await this.$transaction(
      models.map(modelKey => {
        return this[modelKey].deleteMany();
      })
    );
  }
}
