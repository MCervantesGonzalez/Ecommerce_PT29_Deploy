import { UsersService } from '../users/users.service';
import { Users } from '../users/entities/users.entity';
import { UpdateUserDto } from '../users/dtos/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(page: string, limit: string): Promise<Omit<Users, 'password'>[]>;
    getUserById(id: string): Promise<Omit<Users, "password" | "isAdmin">>;
    updateUser(id: string, newUserData: UpdateUserDto): Promise<string | Omit<Users, "password">>;
    deleteUser(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
