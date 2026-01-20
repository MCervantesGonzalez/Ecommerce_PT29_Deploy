import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../products/products.controller';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { Products } from '../products/entities/products.entity';
import { Categories } from '../categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
