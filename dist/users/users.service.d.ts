import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../users/dtos/users.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAllUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]>;
    getUserById(id: string): Promise<Omit<Users, "password" | "isAdmin">>;
    addUser(newUser: CreateUserDto): Promise<string>;
    updateUser(id: string, newUserData: UpdateUserDto): Promise<string | Omit<Users, "password">>;
    deleteUser(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
