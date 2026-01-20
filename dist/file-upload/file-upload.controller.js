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
exports.FileUploadController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
let FileUploadController = class FileUploadController {
    fileUploadService;
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadImage(productId, file) {
        return this.fileUploadService.uploadImage(file, productId);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('uploadImage/:id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Modifica la imagen predefinida de un producto.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del producto a modificar',
        type: String,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Respuesta genérica en caso de éxito',
        content: {
            'application/json': {
                example: {
                    message: 'OK',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'La imagen se subio de forma correcta',
        content: {
            'application/json': {
                example: {
                    id: '2e67fe74-4297-4bb7-8064-f8f91e888e06',
                    name: 'Razer Viper',
                    description: 'Descripcion De Prueba',
                    price: 99.99,
                    stock: 10,
                    imgUrl: 'https://res.cloudinary.com/db5lump8y/image/upload/v1768443036/lw0nvv0ywphtqd3u0d6g.jpg',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Errores de validación al cargar la imagen',
        content: {
            'application/json': {
                examples: {
                    maxSize: {
                        summary: 'Archivo demasiado grande',
                        value: { error: 'Supera el peso máximo de 200kb' },
                    },
                    invalidType: {
                        summary: 'Formato no permitido',
                        value: {
                            error: 'Formato de imagen no válido, solo se permiten jpg, jpeg, webp, gif, png, svg',
                        },
                    },
                    missingFile: {
                        summary: 'Campo file ausente',
                        value: { error: 'El campo file es requerido' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Token Inválido',
        content: {
            'application/json': {
                example: {
                    error: 'El Token es inválido o ausente',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Usuario autenticado pero sin rol autorizado',
        content: {
            'application/json': {
                example: {
                    error: 'No tienes permisos para modificar este recurso',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'El producto que intentabas actualizar no fue encontrado',
        content: {
            'application/json': {
                example: { error: 'El recurso solicitado no fue encontrado.' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200000,
                message: 'Supera el peso máximo de 200kb',
            }),
            new common_1.FileTypeValidator({
                fileType: /(.jpg|.jpeg|.webp|.gif|.png|.svg)/,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadImage", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map