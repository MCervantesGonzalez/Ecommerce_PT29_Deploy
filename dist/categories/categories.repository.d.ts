import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/categories.entity';
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getAllCategories(): Promise<Categories[]>;
    addCategories(): Promise<string>;
}
