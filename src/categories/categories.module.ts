import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesController } from '../categories/categories.controller';
import { CategoriesRepository } from '../categories/categories.repository';
import { Categories } from '../categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
