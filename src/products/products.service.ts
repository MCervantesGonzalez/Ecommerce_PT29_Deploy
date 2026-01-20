import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { Products } from '../products/entities/products.entity'; // Refactorizamos y ahora usamos el DTO de updateProduct.
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProduct();
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  updateProduct(id: string, newProductData: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, newProductData);
  }
  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
