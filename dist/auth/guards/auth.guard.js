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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("../../common/enums/roles.enum");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    jwService;
    configService;
    constructor(jwService, configService) {
        this.jwService = jwService;
        this.configService = configService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader)
            throw new common_1.UnauthorizedException('No se encontro el token');
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token)
            throw new common_1.UnauthorizedException('Metodo de validacion incorrecto');
        try {
            const secret = this.configService.get('JWT_SECRET');
            const payload = this.jwService.verify(token, {
                secret: secret,
            });
            payload.roles = [];
            if (payload.isAdmin) {
                payload.roles.push(roles_enum_1.Role.Admin);
            }
            if (payload.isTester) {
                payload.roles.push(roles_enum_1.Role.Tester);
            }
            else {
                payload.roles.push(roles_enum_1.Role.User);
            }
            request.user = payload;
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new common_1.UnauthorizedException('El token expiro');
            throw new common_1.UnauthorizedException('Error al validar el token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map