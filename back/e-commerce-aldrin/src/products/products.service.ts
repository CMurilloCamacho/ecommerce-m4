import { Injectable } from '@nestjs/common';
import { Product, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository){}
  getProducts(){
    return this.productsRepository.getProducts()
  }
}
