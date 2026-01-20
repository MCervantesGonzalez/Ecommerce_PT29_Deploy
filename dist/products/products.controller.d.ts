import { Products } from './entities/products.entity';
import { ProductsService } from '../products/products.service';
import { UpdateProductDto } from './dtos/updateProduct.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(page: string, limit: string): Promise<Partial<Products>[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Partial<Products>>;
    updateProduct(id: string, newProductData: UpdateProductDto): Promise<Products>;
    deleteProduct(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
