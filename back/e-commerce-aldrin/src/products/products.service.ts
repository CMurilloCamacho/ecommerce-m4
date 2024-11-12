import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json'
import { Categories } from 'src/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository:Repository<Products>,
  @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
  ) {}
  getProducts() {

    return "Productos";
  }

  async addProducts () {
    const categories = await this.categoriesRepository.find()
    data?.map(async (element)=>{
      const category = categories.find(
        (category) => category.name === element.category,
      )

      const product = new Products()
      product.name = element.name
      product.description = element.description
      product.price = element.price
      // product.imgUrl = element.imgUrl
      product.stock = element.stock
      product.category = category

      await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(product)
      .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
      .execute()
    })
    return 'Producto Agregado'
  }










  // findOneProduct(id: number) {
  //   return this.productsRepository.findOneProduct(id);
  // }
  // createProduct(newProduct: any) {
  //   return this.productsRepository.createProduct(newProduct);
  // }
  // updateProduct(id: number, updateProduct) {
  //   return this.productsRepository.updateProduct(id, updateProduct);
  // }

  // deleteProduct(id: number) {
  //   return this.productsRepository.deleteProduct(id);
  // }
}
