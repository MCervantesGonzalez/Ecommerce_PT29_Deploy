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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const users_dto_1 = require("../users/dtos/users.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    getAuth() {
        return this.authService.getAuth();
    }
    signIn(credentials) {
        const { email, password } = credentials;
        return this.authService.signIn(email, password);
    }
    signUp(newUserData) {
        return this.authService.singUp(newUserData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ruta que devuelve un string.' }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ruta de prueba, devuelve un string',
        content: {
            'application/json': {
                example: { message: 'Auth service is running' },
            },
        },
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "getAuth", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Ruta para iniciar sesion ingresando correo y contraseña.',
    }),
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiBody)({
        type: users_dto_1.LoginUserDto,
        description: 'Credenciales de acceso (email y password)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Inicio de sesión exitoso',
        content: {
            'application/json': {
                example: {
                    message: 'Login Correcto',
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YzFkZDM3LWQ0YWItNGI0YS1hMDQ1LTJjZDNkZWNmNmEzZiIsImVtYWlsIjoiRGVtb1VzZXIwMUBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzVGVzdGVyIjpmYWxzZSwiaWF0IjoxNzY4MzY4ODcyLCJleHAiOjE3NjgzNzI0NzJ9.35ylAEjW3rONHuUq1JcAKv3JNMYghZ16KaEVnXiFxwQ',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Credenciales inválidas',
        content: {
            'application/json': {
                example: { error: 'Credenciales de inicio de sesion incorrectas' },
            },
        },
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ruta para crear nuevo usuario.' }),
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiBody)({
        type: users_dto_1.CreateUserDto,
        description: 'Datos necesarios para registrar un nuevo usuario',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario creado exitosamente',
        content: {
            'application/json': {
                example: {
                    id: 'fd89e699-d217-435a-b889-6db66a5e75ff',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos para crear nuevo usuario',
        content: {
            'application/json': {
                example: { error: 'El email ya está registrado' },
            },
        },
    }),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map