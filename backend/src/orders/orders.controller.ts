import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/register.dto';
import { SubscriptionLevel } from '../auth/decorators/subscription-level.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(+id, updateOrderStatusDto);
  }

  @Post(':id/items')
  @UseGuards(JwtAuthGuard)
  addItem(
    @Param('id') id: string,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ) {
    return this.ordersService.addItem(+id, createOrderItemDto);
  }

  @Delete(':orderId/items/:itemId')
  @UseGuards(JwtAuthGuard)
  removeItem(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.ordersService.removeItem(+orderId, +itemId);
  }

  @Get('analytics/brand/:brandId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem acessar analytics avançados
  getOrderAnalytics(@Param('brandId') brandId: string, @Query() query) {
    return this.ordersService.getOrderAnalytics(+brandId, query);
  }

  @Post(':id/bulk-update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PREMIUM') // Apenas marcas com nível PREMIUM podem fazer atualizações em massa
  bulkUpdateOrders(@Body() bulkUpdateData: any) {
    return this.ordersService.bulkUpdateOrders(bulkUpdateData);
  }

  @Get('export/brand/:brandId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem exportar dados
  exportOrders(@Param('brandId') brandId: string, @Query() query) {
    return this.ordersService.exportOrders(+brandId, query);
  }
}
