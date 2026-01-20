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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const categories_entity_1 = require("../categories/entities/categories.entity");
const products_entity_1 = require("../products/entities/products.entity");
const data_json_1 = __importDefault(require("../utils/data.json"));
let ProductsRepository = class ProductsRepository {
    productsRepository;
    categoriesRepository;
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getAllProducts(page, limit) {
        const skip = (page - 1) * limit;
        const products = await this.productsRepository.find({
            where: { isDeleted: false },
            relations: { category: true },
            skip,
            take: limit,
        });
        return products.map(({ isDeleted, ...partialProduct }) => partialProduct);
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id, isDeleted: false },
            relations: { category: true },
        });
        if (!product)
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        const { isDeleted, ...partialProduct } = product;
        return partialProduct;
    }
    async addProduct() {
        const categories = await this.categoriesRepository.find();
        await Promise.all(data_json_1.default.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);
            if (!category)
                throw new common_1.NotFoundException(`La categoría ${element.category} no existe`);
            const product = new products_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        }));
        return 'Productos agregados';
    }
    async updateProduct(id, newProductData) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        const mergedProduct = this.productsRepository.merge(product, newProductData);
        return await this.productsRepository.save(mergedProduct);
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            throw new common_1.NotFoundException(`Producto con id ${id} no encontrado`);
        product.isDeleted = true;
        await this.productsRepository.save(product);
        return { message: 'Producto eliminado', id: product.id };
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_2.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map