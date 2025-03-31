import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { GetBrandsDto } from './dto/get-brands.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/register.dto';
import { SubscriptionLevel } from '../auth/decorators/subscription-level.decorator';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query() query: GetBrandsDto) {
    return this.brandsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Post(':id/customize-store')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem personalizar a loja
  customizeStore(@Param('id') id: string, @Body() customizationData: any) {
    return this.brandsService.customizeStore(+id, customizationData);
  }

  @Post(':id/featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  setFeatured(@Param('id') id: string, @Body() featuredData: { featured: boolean }) {
    return this.brandsService.setFeatured(+id, featuredData.featured);
  }

  @Get('featured')
  getFeaturedBrands() {
    return this.brandsService.getFeaturedBrands();
  }
/*
  @Post(':id/analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem acessar analytics avançados
  getAnalytics(@Param('id') id: string, @Body() analyticsParams: any) {
    return this.brandsService.getAnalytics(+id, analyticsParams);
  }

  @Post(':id/marketing-campaigns')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PREMIUM') // Apenas marcas com nível PREMIUM podem criar campanhas de marketing
  createMarketingCampaign(@Param('id') id: string, @Body() campaignData: any) {
    return this.brandsService.createMarketingCampaign(+id, campaignData);
  }*/
}
