import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts():string{
    return "acá están todos los productos"
  }
}
