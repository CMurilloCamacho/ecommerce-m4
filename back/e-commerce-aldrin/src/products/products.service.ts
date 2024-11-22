import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/entities/categories.entity';
import { UpdateProductsDto } from './dto/update-products.dto';
import * as data from '../data.json';
import { CreateProductDto } from './dto/create.products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const [products] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    return this.productsRepository.find()
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = this.productsRepository.create(product);
    return await this.productsRepository.save(newProduct);
  }
  updateProduct(id: number, updateProduct: UpdateProductsDto) {
    return this.productsRepository.update(id, updateProduct);
  }

  async deleteProduct(id: number) {
    return await this.productsRepository.delete(id);
  }

  async addProducts() {
    
    const categories = await this.categoriesRepository.find();
    console.log('CATEGORIES', categories);
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      if (!category) throw new Error(`Category "${element.category}"`);
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      // product.imgUrl = element.imgUrl
      product.stock = element.stock;
      product.category = category;
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'Producto Agregado';
  }
}
