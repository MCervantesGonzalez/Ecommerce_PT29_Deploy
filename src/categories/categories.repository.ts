import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/categories.entity';
import data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    const insertPromises = data.map((element) =>
      this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute(),
    );

    await Promise.all(insertPromises);

    return 'Categorías agregadas';
  }
}
