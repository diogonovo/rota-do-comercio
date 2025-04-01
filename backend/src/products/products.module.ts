import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsServiceExt } from './products.service-extension';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService,ProductsServiceExt],
  exports: [ProductsService,ProductsServiceExt],
})
export class ProductsModule {}
