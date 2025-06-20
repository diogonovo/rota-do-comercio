import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SubscriptionGuard } from './guards/subscription.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SubscriptionGuard,
    },
  ],
  exports: [],
})
export class SubscriptionLevelModule {}
