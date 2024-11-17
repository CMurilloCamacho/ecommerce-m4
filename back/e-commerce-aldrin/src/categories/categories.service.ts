import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Any, FileLogger, Repository } from 'typeorm';
import * as data from '../data.json';
import { log } from 'console';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories() {
    // Buscar categorías existentes
    const findCategories = await this.categoriesRepository.find();
    const categoryNames = new Set(findCategories.map((cat) => cat.name));

    // Filtrar categorías que no existen
    const dataCategoryNames = data?.filter(
      (category) => !categoryNames.has(category.category),
    );

    if (dataCategoryNames.length > 0) {
      const insertNewCategory = dataCategoryNames.map((cat) => {
        const newCategory = new Categories();
        newCategory.name = cat.category;
        return newCategory;
      });

      return await this.categoriesRepository.save(insertNewCategory);
    }
    const showNameCategories = await this.categoriesRepository.find();
    return showNameCategories;
  }

  async getCategories(){

    return await this.categoriesRepository.find()

  }
}


