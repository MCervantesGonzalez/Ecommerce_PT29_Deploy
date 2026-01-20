import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Products } from '../products/entities/products.entity';
import { UpdateProductDto } from './dtos/updateProduct.dto';
export declare class ProductsRepository {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    getAllProducts(page: number, limit: number): Promise<Partial<Products>[]>;
    getProductById(id: string): Promise<Partial<Products>>;
    addProduct(): Promise<string>;
    updateProduct(id: string, newProductData: UpdateProductDto): Promise<Products>;
    deleteProduct(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
