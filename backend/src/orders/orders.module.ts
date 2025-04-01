import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersServiceExt } from './orders.service-extension';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersServiceExt],
  exports: [OrdersService,OrdersServiceExt],
})
export class OrdersModule {}
