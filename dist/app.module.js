"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_2 = __importDefault(require("./config/typeorm"));
const environment_1 = require("./config/environment");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const products_service_1 = require("./products/products.service");
const categories_module_1 = require("./categories/categories.module");
const categories_service_1 = require("./categories/categories.service");
const orders_module_1 = require("./orders/orders.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
let AppModule = AppModule_1 = class AppModule {
    categoriesService;
    productsService;
    logger = new common_1.Logger(AppModule_1.name);
    configure(consumer) {
        consumer.apply(logger_middleware_1.loggerGlobal).forRoutes('*');
    }
    constructor(categoriesService, productsService) {
        this.categoriesService = categoriesService;
        this.productsService = productsService;
    }
    async onApplicationBootstrap() {
        if (process.env.NODE_ENV !== 'development')
            return;
        await this.categoriesService.addCategories();
        this.logger.log('Se cargaron las categorias');
        await this.productsService.addProducts();
        this.logger.log('Se cargaron los productos');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            file_upload_module_1.FileUploadModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: environment_1.environment.JWT_SECRET,
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        products_service_1.ProductsService])
], AppModule);
//# sourceMappingURL=app.module.js.map