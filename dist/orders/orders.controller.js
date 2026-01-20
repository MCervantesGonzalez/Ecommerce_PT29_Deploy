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
exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../orders/orders.service");
const orders_dto_1 = require("../orders/dtos/orders.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    getOrderById(id) {
        return this.ordersService.getOrderById(id);
    }
    addOrder(newOrderData) {
        return this.ordersService.addOrder(newOrderData);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Busca una orden por su UUID.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID de la orden a buscar',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orden encontrada correctamente',
        content: {
            'application/json': {
                example: {
                    id: '46785d7b-6b70-4e70-ae1c-5312c60cf8c4',
                    date: '2026-01-14T04:07:39.941Z',
                    orderDetails: {
                        id: '9dced0b5-0f31-4f88-acb4-9f24cdc40d97',
                        price: 599.99,
                        products: {
                            id: '9e9d28e3-ca60-4073-9297-2297dd7f8252',
                            name: 'NVIDIA GeForce RTX 4070',
                            description: 'High-end graphics card for gaming and ray tracing',
                            price: 599.99,
                            stock: 6,
                            imgUrl: 'https://pngtree.com/freepng/illustration-of-a-flat-vector-icon-set-featuring-a-camera-symbol-and-a-placeholder-image-icon-vector_12324408.html',
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'El UUID proporcionado no es válido',
        content: {
            'application/json': {
                example: { error: 'Formato de UUID inválido' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o ausente',
        content: {
            'application/json': {
                example: { error: 'Token inválido' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'La orden no fue encontrada',
        content: {
            'application/json': {
                example: { error: 'Orden con el UUID especificado no existe' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ruta para crear una orden.' }),
    (0, swagger_1.ApiBody)({
        type: orders_dto_1.CreateOrderDto,
        description: 'Datos necesarios para crear una orden',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Orden creada exitosamente',
        content: {
            'application/json': {
                example: {
                    id: '8bc110ea-da76-4b6f-ad62-db70cfd3f0d3',
                    date: '2026-01-14T04:59:12.469Z',
                    orderDetails: {
                        id: '762c373b-f77b-4a2f-9d80-55e3fde55198',
                        price: 349.99,
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos para crear la orden',
        content: {
            'application/json': {
                example: { error: 'El campo products no puede estar vacío' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o ausente',
        content: {
            'application/json': {
                example: {
                    error: 'El Token es inválido o ausente',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 201, type: [require("./entities/orders.entity").Orders] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map