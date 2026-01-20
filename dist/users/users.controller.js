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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const users_service_1 = require("../users/users.service");
const users_dto_1 = require("../users/dtos/users.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAllUsers(page, limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
        const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
        return this.usersService.getAllUsers(validPage, validLimit);
    }
    async getUserById(id) {
        return this.usersService.getUserById(id);
    }
    async updateUser(id, newUserData) {
        return this.usersService.updateUser(id, newUserData);
    }
    async deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin, roles_enum_1.Role.Tester),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
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
        description: 'Usuarios por página',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Recibe un array con todos los usuarios.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuarios obtenida correctamente',
        content: {
            'application/json': {
                example: [
                    {
                        id: '74c1dd37-d4ab-4b4a-a045-2cd3decf6a3f',
                        name: 'Demo User 00',
                        email: 'DemoUser00@mail.com',
                        phone: 1234567890,
                        country: 'Demo Country',
                        address: 'Demo Street 00',
                        city: 'Demo City',
                    },
                    {
                        id: '74c1dd37-d4bb-4b4a-b045-2fd3decf6b3f',
                        name: 'Demo User 01',
                        email: 'DemoUser01@mail.com',
                        phone: 1234567890,
                        country: 'Demo Country',
                        address: 'Demo Street 01',
                        city: 'Demo City',
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: {
                    error: 'Token inválido',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Busca a un usuario por su UUID.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del usuario a buscar',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario encontrado correctamente',
        content: {
            'application/json': {
                example: {
                    id: '74c1dd37-d4ab-4b4a-a045-2cd3decf6a3f',
                    name: 'Demo User 00',
                    email: 'DemoUser00@mail.com',
                    phone: 1234567890,
                    country: 'Demo Country',
                    address: 'Demo Street 00',
                    city: 'Demo City',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: {
                    error: 'Token inválido',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
        content: {
            'application/json': {
                example: {
                    error: 'No se encontró el usuario con id especificado.',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca a un usuario por su UUID y actualiza sus campos.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del usuario a modificar',
        type: String,
    }),
    (0, swagger_1.ApiBody)({
        type: users_dto_1.UpdateUserDto,
        description: 'Datos necesarios para modificar usuario.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario actualizado correctamente',
        content: {
            'application/json': {
                example: {
                    address: 'Demo Street 987',
                    phone: 1234567890,
                    country: 'Demo Country 987',
                    city: 'Demo City 987',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos para actualizar el usuario',
        content: {
            'application/json': {
                example: {
                    error: 'Ingresa datos validos para actualizar.',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: {
                    error: 'Token inválido',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
        content: {
            'application/json': {
                example: {
                    error: 'No se encontró el usuario con id especificado.',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Busca a un usuario por su UUID y lo elimina.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del usuario a eliminar',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario eliminado correctamente',
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
        description: 'UUID de usuario inválido',
        content: {
            'application/json': {
                example: {
                    error: 'El UUID del usuario es inválido o faltante.',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token inválido o faltante',
        content: {
            'application/json': {
                example: {
                    error: 'Token inválido',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
        content: {
            'application/json': {
                example: {
                    error: 'No se encontró el usuario con id especificado.',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map