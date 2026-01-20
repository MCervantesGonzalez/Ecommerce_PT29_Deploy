import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../users/dtos/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'],
      where: { isDeleted: false },
      skip: skip,
      take: limit,
    });

    return allUsers.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password' | 'isAdmin'>> {
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
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    const { password, ...filteredUser } = foundUser;
    return filteredUser;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email, isDeleted: false } });
  }

  async addUser(newUserData: CreateUserDto): Promise<string> {
    const savedUser = await this.usersRepository.save(newUserData);
    return savedUser.id;
  }

  async updateUser(
    id: string,
    newUserData: UpdateUserDto,
  ): Promise<Omit<Users, 'password'> | string> {
    const user = await this.usersRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!user) throw new NotFoundException(`No existe usuario con id ${id}`);
    const mergedUser = this.usersRepository.merge(user, newUserData);

    const savedUser = await this.usersRepository.save(mergedUser);
    const { password, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

  async deleteUser(id: string): Promise<{ message: string; id: string }> {
    const foundUser = await this.usersRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!foundUser)
      throw new NotFoundException(`No existe usuario con id ${id}`);

    foundUser.isDeleted = true;
    await this.usersRepository.save(foundUser);
    return { message: 'Usuario eliminado con éxito.', id: foundUser.id };
  }
}
