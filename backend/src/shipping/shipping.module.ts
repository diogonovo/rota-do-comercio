import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingServiceExt } from './shipping.service-extension';
import { ShippingController } from './shipping.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShippingController],
  providers: [ShippingService,ShippingServiceExt],
  exports: [ShippingService,ShippingServiceExt],
})
export class ShippingModule {}
