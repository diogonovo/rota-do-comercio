import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsServiceExt } from './products.service-extension';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../auth/dto/register.dto';
import { SubscriptionLevel } from '../auth/decorators/subscription-level.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    private readonly productsServiceExt: ProductsServiceExt
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem adicionar múltiplas imagens
  addImage(
    @Param('id') id: string,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.productsService.addImage(+id, createProductImageDto);
  }

  @Post(':id/variants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem adicionar variantes
  addVariant(
    @Param('id') id: string,
    @Body() createProductVariantDto: CreateProductVariantDto,
  ) {
    return this.productsService.addVariant(+id, createProductVariantDto);
  }

  @Post(':id/highlight')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.MARCA)
  @SubscriptionLevel('PRO') // Apenas marcas com nível PRO ou superior podem destacar produtos
  highlightProduct(@Param('id') id: string) {
    return this.productsServiceExt.highlightProduct(+id);
  }
/*
  @Get('brand/:brandId')
  findByBrand(@Param('brandId') brandId: string, @Query() query) {
    return this.productsServiceExt.findByBrand(+brandId, query);
  }*/

  @Get('featured')
  findFeatured() {
    return this.productsServiceExt.findFeatured();
  }
/*
  @Get('category/:category')
  findByCategory(@Param('category') category: string, @Query() query) {
    return this.productsServiceExt.findByCategory(category, query);
  }*/
}
