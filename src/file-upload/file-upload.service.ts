import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadRepository } from '../file-upload/file-upload.repository';
import { Products } from '../products/entities/products.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });
    if (!product)
      throw new NotFoundException(
        `No se encontró el producto con id: ${productId}`,
      );
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url)
      throw new NotFoundException(`Error al cargar imagen en Cloudinary`);

    await this.productsRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updatedProduct;
  }
}
