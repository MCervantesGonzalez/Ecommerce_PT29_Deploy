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
exports.CategoriesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const categories_service_1 = require("../categories/categories.service");
const swagger_1 = require("@nestjs/swagger");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    addCategories() {
        return this.categoriesService.addCategories();
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Recibe un array con todas las categorias.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Array de categorías obtenido correctamente',
        content: {
            'application/json': {
                example: [
                    {
                        id: '00015214-110e-4b43-83e6-e1f1b27903b6',
                        name: 'monitor',
                    },
                    {
                        id: '44fce626-261b-41b9-8672-40692139b038',
                        name: 'motherboard',
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encontraron categorías en la base de datos',
        content: {
            'application/json': {
                example: { error: 'No existen categorías registradas' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/categories.entity").Categories] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, swagger_1.ApiOperation)({ summary: 'Ruta para precargar categorias a la BD.' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Categorias precargadas exitosamente',
        content: {
            'application/json': {
                example: {
                    message: 'Categorias insertadas correctamente',
                    categories: [
                        {
                            id: '00015214-110e-4b43-83e6-e1f1b27903b6',
                            name: 'monitor',
                        },
                        {
                            id: '44fce626-261b-41b9-8672-40692139b038',
                            name: 'motherboard',
                        },
                    ],
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al intentar precargar categorías',
        content: {
            'application/json': {
                example: { error: 'Las categorías ya existen en la base de datos' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "addCategories", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map