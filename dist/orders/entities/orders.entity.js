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
exports.Orders = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orderdetails_entity_1 = require("../entities/orderdetails.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const swagger_1 = require("@nestjs/swagger");
let Orders = class Orders {
    id;
    date;
    orderDetails;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => Date }, orderDetails: { required: true, type: () => require("./orderdetails.entity").OrderDetails }, user: { required: true, type: () => require("../../users/entities/users.entity").Users } };
    }
};
exports.Orders = Orders;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID v4 generado por la BD',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Orders.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de la orden en formato dd/mm/yyyy',
        example: '01/01/2026',
        format: 'date',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Orders.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalles asociados a la orden',
        type: () => orderdetails_entity_1.OrderDetails,
    }),
    (0, typeorm_1.OneToOne)(() => orderdetails_entity_1.OrderDetails, (orderDetails) => orderDetails.order),
    __metadata("design:type", orderdetails_entity_1.OrderDetails)
], Orders.prototype, "orderDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Usuario al que se asocia la orden',
        type: () => users_entity_1.Users,
    }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.Users)
], Orders.prototype, "user", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)({
        name: 'ORDERS',
    })
], Orders);
//# sourceMappingURL=orders.entity.js.map