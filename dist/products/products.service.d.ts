import { ProductsRepository } from '../products/products.repository';
import { Products } from '../products/entities/products.entity';
import { UpdateProductDto } from './dtos/updateProduct.dto';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    getAllProducts(page: number, limit: number): Promise<Partial<Products>[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Partial<Products>>;
    updateProduct(id: string, newProductData: UpdateProductDto): Promise<Products>;
    deleteProduct(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
