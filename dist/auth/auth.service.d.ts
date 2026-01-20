import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/users.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    getAuth(): string;
    signIn(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    singUp(newUserData: CreateUserDto): Promise<string>;
}
