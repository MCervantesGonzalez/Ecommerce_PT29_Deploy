import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../users/dtos/users.dto';
export declare class UsersRepository {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    getAllUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]>;
    getUserById(id: string): Promise<Omit<Users, 'password' | 'isAdmin'>>;
    getUserByEmail(email: string): Promise<Users | null>;
    addUser(newUserData: CreateUserDto): Promise<string>;
    updateUser(id: string, newUserData: UpdateUserDto): Promise<Omit<Users, 'password'> | string>;
    deleteUser(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
