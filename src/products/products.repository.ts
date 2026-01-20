import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Products } from '../products/entities/products.entity';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getAllProducts(
    page: number,
    limit: number,
  ): Promise<Partial<Products>[]> {
    const skip = (page - 1) * limit;
    const products = await this.productsRepository.find({
      where: { isDeleted: false },
      relations: { category: true },
      skip,
      take: limit,
    });
    return products.map(({ isDeleted, ...partialProduct }) => partialProduct);
  }

  async getProductById(id: string): Promise<Partial<Products>> {
    const product = await this.productsRepository.findOne({
      where: { id, isDeleted: false },
      relations: { category: true },
    });

    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    const { isDeleted, ...partialProduct } = product;
    return partialProduct;
  }

  async addProduct(): Promise<string> {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category)
          throw new NotFoundException(
            `La categoría ${element.category} no existe`,
          );

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async updateProduct(
    id: string,
    newProductData: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    const mergedProduct = this.productsRepository.merge(
      product,
      newProductData,
    );
    return await this.productsRepository.save(mergedProduct);
  }

  async deleteProduct(id: string): Promise<{ message: string; id: string }> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    product.isDeleted = true;
    await this.productsRepository.save(product);

    return { message: 'Producto eliminado', id: product.id };
  }
}
