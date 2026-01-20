import { CategoriesRepository } from '../categories/categories.repository';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getAllCategories(): Promise<import("./entities/categories.entity").Categories[]>;
    addCategories(): Promise<string>;
}
