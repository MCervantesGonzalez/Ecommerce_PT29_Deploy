import { Repository } from 'typeorm';
import { FileUploadRepository } from '../file-upload/file-upload.repository';
import { Products } from '../products/entities/products.entity';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsRepository;
    constructor(fileUploadRepository: FileUploadRepository, productsRepository: Repository<Products>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Products | null>;
}
