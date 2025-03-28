import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/register.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  findAllPayments(@Query() query) {
    return this.paymentsService.findAllPayments(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  findOnePayment(@Param('id') id: string) {
    return this.paymentsService.findOnePayment(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.updatePayment(+id, updatePaymentDto);
  }

  @Post('commissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  createCommission(@Body() createCommissionDto: CreateCommissionDto) {
    return this.paymentsService.createCommission(createCommissionDto);
  }

  @Get('commissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  findAllCommissions(@Query() query) {
    return this.paymentsService.findAllCommissions(query);
  }

  @Get('commissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  findOneCommission(@Param('id') id: string) {
    return this.paymentsService.findOneCommission(+id);
  }

  @Patch('commissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  updateCommission(
    @Param('id') id: string,
    @Body() updateCommissionDto: UpdateCommissionDto,
  ) {
    return this.paymentsService.updateCommission(+id, updateCommissionDto);
  }

  @Get('brands/:brandId/commissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  getCommissionsByBrand(
    @Param('brandId') brandId: string,
    @Query() query,
  ) {
    return this.paymentsService.getCommissionsByBrand(+brandId, query);
  }
}
