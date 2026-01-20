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
exports.LoginUserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_decorator_1 = require("../../common/decorators/matchPassword.decorator");
const swagger_2 = require("@nestjs/swagger");
class CreateUserDto {
    name;
    email;
    password;
    confirmPassword;
    address;
    phone;
    country;
    city;
    isAdmin;
    isTester;
    isDeleted;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, maxLength: 15 }, confirmPassword: { required: true, type: () => String }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String, minLength: 5, maxLength: 20 }, city: { required: true, type: () => String, minLength: 5, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Demo User 01', description: 'Nombre del usuario' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DemoUser01@mail.com',
        description: 'Correo electrónico válido',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'AAbb##11',
        description: 'Contraseña segura (8-15 caracteres alfanumericos y especiales)',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'AAbb##11',
        description: 'Confirmación de contraseña',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(matchPassword_decorator_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Demo Street 123',
        description: 'Dirección del usuario',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1122334455, description: 'Teléfono válido' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Demo Country', description: 'País del usuario' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Demo City', description: 'Ciudad del usuario' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isTester", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isDeleted", void 0);
class UpdateUserDto extends (0, swagger_2.PartialType)((0, swagger_2.OmitType)(CreateUserDto, [
    'name',
    'email',
    'password',
    'confirmPassword',
])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserDto = UpdateUserDto;
class LoginUserDto extends (0, swagger_2.PickType)(CreateUserDto, [
    'email',
    'password',
]) {
    email;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'DemoUser01@mail.com',
        description: 'Correo electrónico para login',
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AAbb##11', description: 'Contraseña para login' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=users.dto.js.map