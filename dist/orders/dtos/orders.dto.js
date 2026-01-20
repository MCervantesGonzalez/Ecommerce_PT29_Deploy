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
exports.CreateOrderDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OrderProductDto {
    id;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, format: "uuid" } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID v4 del producto',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], OrderProductDto.prototype, "id", void 0);
class CreateOrderDto {
    userId;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, products: { required: true, type: () => [OrderProductDto], minItems: 1 } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID v4 del usuario que realiza la orden',
        example: '660e8400-e29b-41d4-a716-446655440111',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID debe ser un UUID v4' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de productos incluidos en la orden (mínimo 1)',
        type: () => [OrderProductDto],
        example: [{ id: '550e8400-e29b-41d4-a716-446655440000' }],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
//# sourceMappingURL=orders.dto.js.map