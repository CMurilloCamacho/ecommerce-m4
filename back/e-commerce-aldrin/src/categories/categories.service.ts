import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

    async addCategories() {
      await Promise.all(

        data.map(async (product)=>{
          await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({name: product.category})
          .orIgnore(`("name") DO NOTHING`)
          .execute()
          
        })
      )
      return "Categorias agregadas"

  }

  async getCategories(){

    const allCategories = await this.categoriesRepository.find()
    return allCategories

  }
}


