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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create.products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private  productsService: ProductsService) {}

  @Get()
  async getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.productsService.getProducts(parseInt(page), parseInt(limit));
    return await this.productsService.getProducts(1,5)
  }


  @Get('seeder')
  addProducts(){
    return this.productsService.addProducts()
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    console.log("este es el id", id);
    return this.productsService.getProduct(id);
    

  }

  @Post()
 async createProduct(@Body() product: CreateProductDto) {
   return await this.productsService.createProduct(product);
  }
  @Put(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateProduct:UpdateProductsDto,
  ) {
    return await this.productsService.updateProduct(id, updateProduct);
  }


  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: number) {
    return await this.productsService.deleteProduct(id);
  }



}
