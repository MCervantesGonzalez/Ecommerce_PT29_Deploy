import { MiddlewareConsumer, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
export declare class AppModule implements NestModule, OnApplicationBootstrap {
    private readonly categoriesService;
    private readonly productsService;
    private readonly logger;
    configure(consumer: MiddlewareConsumer): void;
    constructor(categoriesService: CategoriesService, productsService: ProductsService);
    onApplicationBootstrap(): Promise<void>;
}
