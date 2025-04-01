import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingServiceExt } from './shipping.service-extension';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { GetShippingsDto } from './dto/get-shipping.dto';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/register.dto';
import { SubscriptionLevel } from '../auth/decorators/subscription-level.decorator';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService,
    private readonly shippingServiceExt: ShippingServiceExt
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  createShipping(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.createShipping(createShippingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllShippings(@Query() query:GetShippingsDto) {
    return this.shippingService.findAllShippings(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneShipping(@Param('id') id: string) {
    return this.shippingService.findOneShipping(+id);
  }

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  findShippingByOrderId(@Param('orderId') orderId: string) {
    return this.shippingService.findShippingByOrderId(+orderId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  updateShipping(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    return this.shippingService.updateShipping(+id, updateShippingDto);
  }

  @Post('carriers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  createCarrier(@Body() createCarrierDto: CreateCarrierDto) {
    return this.shippingService.createCarrier(createCarrierDto);
  }

  @Get('carriers')
  @UseGuards(JwtAuthGuard)
  findAllCarriers(@Query() query) {
    return this.shippingService.findAllCarriers(query);
  }

  @Get('carriers/:id')
  @UseGuards(JwtAuthGuard)
  findOneCarrier(@Param('id') id: string) {
    return this.shippingService.findOneCarrier(+id);
  }

  @Patch('carriers/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  updateCarrier(
    @Param('id') id: string,
    @Body() updateCarrierDto: UpdateCarrierDto,
  ) {
    return this.shippingService.updateCarrier(+id, updateCarrierDto);
  }

  @Delete('carriers/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  removeCarrier(@Param('id') id: string) {
    return this.shippingService.removeCarrier(+id);
  }

  @Post('bulk-create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PREMIUM') // Apenas marcas com nível PREMIUM podem criar envios em massa
  bulkCreateShippings(@Body() bulkCreateData: any) {
    return this.shippingServiceExt.bulkCreateShippings(bulkCreateData);
  }

  @Get('tracking/:code')
  @UseGuards(JwtAuthGuard)
  trackShipment(@Param('code') code: string) {
    return this.shippingServiceExt.trackShipment(code);
  }

  @Get('analytics/brand/:brandId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem acessar analytics de envio
  getShippingAnalytics(@Param('brandId') brandId: string, @Query() query) {
    return this.shippingServiceExt.getShippingAnalytics(+brandId, query);
  }

  @Post('custom-rates')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PREMIUM') // Apenas marcas com nível PREMIUM podem configurar taxas personalizadas
  setCustomShippingRates(@Body() customRatesData: any) {
    return this.shippingServiceExt.setCustomShippingRates(customRatesData);
  }
}
