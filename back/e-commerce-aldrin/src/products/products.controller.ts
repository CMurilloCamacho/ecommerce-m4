import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create.products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decoradors/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role.enum';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (page && limit)
      return this.productsService.getProducts(parseInt(page), parseInt(limit));
    return await this.productsService.getProducts(1, 5);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    console.log('este es el id', id);
    return this.productsService.getProduct(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 201, description: 'Producto creado con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'Permiso denegado.' })
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateProduct: UpdateProductsDto,
  ) {
    return await this.productsService.updateProduct(id, updateProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: number) {
    return await this.productsService.deleteProduct(id);
  }
}
