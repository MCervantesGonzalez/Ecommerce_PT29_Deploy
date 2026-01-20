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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const products_entity_1 = require("../../products/entities/products.entity");
const swagger_1 = require("@nestjs/swagger");
let Categories = class Categories {
    id;
    name;
    product;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, product: { required: true, type: () => [require("../../products/entities/products.entity").Products] } };
    }
};
exports.Categories = Categories;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID v4 generado por la BD.',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Categories.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la categoría (máx. 50 caracteres, no puede ser null).',
        example: 'Electrónica',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de productos asociados a esta categoría',
        type: () => [products_entity_1.Products],
    }),
    (0, typeorm_1.OneToMany)(() => products_entity_1.Products, (product) => product.category),
    __metadata("design:type", Array)
], Categories.prototype, "product", void 0);
exports.Categories = Categories = __decorate([
    (0, typeorm_1.Entity)({
        name: 'CATEGORIES',
    })
], Categories);
//# sourceMappingURL=categories.entity.js.map