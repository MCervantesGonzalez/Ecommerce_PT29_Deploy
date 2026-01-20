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
exports.OrdersRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const orderdetails_entity_1 = require("../orders/entities/orderdetails.entity");
const orders_entity_1 = require("../orders/entities/orders.entity");
const products_entity_1 = require("../products/entities/products.entity");
const users_entity_1 = require("../users/entities/users.entity");
let OrdersRepository = class OrdersRepository {
    ordersRepository;
    orderDetailRepository;
    usersRepository;
    productsRepository;
    constructor(ordersRepository, orderDetailRepository, usersRepository, productsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async getOrderById(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException(`La orden con id ${id} no fue encontrada`);
        return order;
    }
    async addOrder(newOrderData) {
        const { userId, products } = newOrderData;
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con el id ${userId} no fue encontrado`);
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);
        const producsArray = await Promise.all(products.map(async (element) => {
            const product = await this.productsRepository.findOneBy({
                id: element.id,
            });
            if (!product)
                throw new common_1.NotFoundException(`El producto con id ${element.id} no fue encontrado`);
            await this.productsRepository.update({ id: element.id }, { stock: product.stock - 1 });
            return product;
        }));
        const total = producsArray.reduce((sum, product) => sum + Number(product.price), 0);
        const orderDetail = new orderdetails_entity_1.OrderDetails();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = producsArray;
        orderDetail.order = newOrder;
        await this.orderDetailRepository.save(orderDetail);
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: true,
            },
        });
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_2.InjectRepository)(orderdetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __param(3, (0, typeorm_2.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map