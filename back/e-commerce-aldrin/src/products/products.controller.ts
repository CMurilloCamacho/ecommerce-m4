import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.productsService.getProducts();
  }
  // @Get(':id')
  // findOneProduct(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.productsService.findOneProduct(id);
  // }
  // @Post()
  // createProduct(@Body() newProduct: any) {
  //   return this.productsService.createProduct(newProduct);
  // }
  // @Put(':id')
  // updateProduct(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Body() updateProduct: any,
  // ) {
  //   return this.productsService.updateProduct(id, updateProduct);
  // }
  // @Delete(':id')
  // deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.productsService.deleteProduct(id);
  // }
  @Get('seeder')
  addProducts(){
    return this.productsService.addProducts()
  }
}
