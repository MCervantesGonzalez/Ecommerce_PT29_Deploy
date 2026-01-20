import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeOrmConfig from './config/typeorm';
import { environment } from './config/environment';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [typeOrmConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm')!,
    }),

    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerGlobal).forRoutes('*');
  }

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'development') return;

    await this.categoriesService.addCategories();
    this.logger.log('Se cargaron las categorias');

    await this.productsService.addProducts();
    this.logger.log('Se cargaron los productos');
  }
}
