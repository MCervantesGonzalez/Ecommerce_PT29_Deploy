import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../users/dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  async getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async addUser(newUser: CreateUserDto): Promise<string> {
    return this.usersRepository.addUser(newUser);
  }

  async updateUser(id: string, newUserData: UpdateUserDto) {
    return this.usersRepository.updateUser(id, newUserData);
  }

  async deleteUser(id: string): Promise<{ message: string; id: string }> {
    return this.usersRepository.deleteUser(id);
  }
}
