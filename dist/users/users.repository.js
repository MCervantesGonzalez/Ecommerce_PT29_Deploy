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
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/entities/users.entity");
let UsersRepository = class UsersRepository {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getAllUsers(page, limit) {
        const skip = (page - 1) * limit;
        const allUsers = await this.usersRepository.find({
            select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
            where: { isDeleted: false },
            skip: skip,
            take: limit,
        });
        return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
    }
    async getUserById(id) {
        const foundUser = await this.usersRepository.findOne({
            where: { id, isDeleted: false },
            relations: {
                orders: {
                    orderDetails: {
                        products: true,
                    },
                },
            },
        });
        if (!foundUser)
            throw new common_1.NotFoundException(`No se encontró el usuario con id ${id}`);
        const { password, ...filteredUser } = foundUser;
        return filteredUser;
    }
    async getUserByEmail(email) {
        return this.usersRepository.findOne({ where: { email, isDeleted: false } });
    }
    async addUser(newUserData) {
        const savedUser = await this.usersRepository.save(newUserData);
        return savedUser.id;
    }
    async updateUser(id, newUserData) {
        const user = await this.usersRepository.findOne({
            where: { id, isDeleted: false },
        });
        if (!user)
            throw new common_1.NotFoundException(`No existe usuario con id ${id}`);
        const mergedUser = this.usersRepository.merge(user, newUserData);
        const savedUser = await this.usersRepository.save(mergedUser);
        const { password, ...userNoPassword } = savedUser;
        return userNoPassword;
    }
    async deleteUser(id) {
        const foundUser = await this.usersRepository.findOne({
            where: { id, isDeleted: false },
        });
        if (!foundUser)
            throw new common_1.NotFoundException(`No existe usuario con id ${id}`);
        foundUser.isDeleted = true;
        await this.usersRepository.save(foundUser);
        return { message: 'Usuario eliminado con éxito.', id: foundUser.id };
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map