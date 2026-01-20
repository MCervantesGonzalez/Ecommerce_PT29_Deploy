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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const products_service_1 = require("../products/products.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
const updateProduct_dto_1 = require("./dtos/updateProduct.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    getAllProducts(page, limit) {
        if (page && limit)
            return this.productsService.getAllProducts(Number(page), Number(limit));
        return this.productsService.getAllProducts(Number(1), Number(5));
    }
    addProducts() {
        return this.productsService.addProducts();
    }
    getProductById(id) {
        return this.productsService.getProductById(id);
    }
    async updateProduct(id, newProductData) {
        return this.productsService.updateProduct(id, newProductData);
    }
    deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Numero de página',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Productos por página',
    }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Recibe un array con todos los productos.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de productos obtenida correctamente',
        content: {
            'application/json': {
                example: [
                    {
                        id: '10c9fff0-a80e-4d75-ac5e-9665b2225710',
                        name: 'Samsung Odyssey G9',
                        description: '49-inch ultra-wide curved gaming monitor with high refresh rate and immersive aspect ratio',
                        price: '299.99',
                        stock: 12,
                        imgUrl: 'https://example.com/product-image.png',
                        category: {
                            id: '00015214-110e-4b43-83e6-e1f1b27903b6',
                            name: 'monitor',
                        },
                    },
                    {
                        id: '1b4a762b-a460-47da-9cc8-09ebe5660faf',
                        name: 'G.Skill Trident Z RGB 16GB DDR4',
                        description: 'Reliable DDR4 RAM with RGB lighting',
                        price: '89.99',
                        stock: 20,
                        imgUrl: 'https://example.com/product-image.png',
                        category: {
                            id: '302aee25-c76b-4365-a583-64d504937454',
                            name: 'ram',
                        },
                    },
                ],
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, swagger_1.ApiOperation)({ summary: 'Ruta para precargar productos a la BD.' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Productos precargados correctamente',
        content: {
            'application/json': {
                example: { message: 'Productos insertados en la base de datos.' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca un producto por su UUID.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del producto a buscar',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Producto encontrado correctamente',
        content: {
            'application/json': {
                example: {
                    id: '10c9fff0-a80e-4d75-ac5e-9665b2225710',
                    name: 'Samsung Odyssey G9',
                    description: '49-inch ultra-wide curved gaming monitor with high refresh rate and immersive aspect ratio',
                    price: '299.99',
                    stock: 12,
                    imgUrl: 'https://example.com/product-image.png',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos buscar el producto',
        content: {
            'application/json': {
                example: {
                    error: 'UUID inválido o faltante.',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Producto no encontrado',
        content: {
            'application/json': {
                example: { error: 'No se encontró el producto con id especificado.' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca un producto por su UUID y actualiza sus campos.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del producto a modificar',
        type: String,
    }),
    (0, swagger_1.ApiBody)({
        type: updateProduct_dto_1.UpdateProductDto,
        description: 'Datos necesarios para modificar producto.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Producto actualizado correctamente',
        content: {
            'application/json': {
                example: {
                    id: '97b31c4c-3c64-453b-ac6d-caf215d9ba25',
                    name: 'Motorola Edge 40',
                    description: 'Mid-range smartphone whit OLED display, fast charging and clean Android experience',
                    price: '179.78',
                    stock: 12,
                    imgUrl: 'https://example.com/product-image.png',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos para actualizar el producto',
        content: {
            'application/json': {
                example: { error: 'Ingresa datos válidos para actualizar.' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: { error: 'Token inválido' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Producto no encontrado',
        content: {
            'application/json': {
                example: { error: 'No se encontró el producto con id especificado.' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/products.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateProduct_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Busca un producto por su UUID y lo elimina.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del producto a eliminar',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Producto eliminado correctamente',
        content: {
            'application/json': {
                example: {
                    message: 'Usuario eliminado con éxito.',
                    id: '...',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'UUID de producto inválido',
        content: {
            'application/json': {
                example: { error: 'El UUID del producto es inválido o faltante.' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: { error: 'Token inválido' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Producto no encontrado',
        content: {
            'application/json': {
                example: { error: 'No se encontró el producto con id especificado.' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('/products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map