import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../config/cloudinary';
import { FileUploadController } from '../file-upload/file-upload.controller';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FileUploadRepository } from '../file-upload/file-upload.repository';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
