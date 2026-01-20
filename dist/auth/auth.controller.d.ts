import { AuthService } from '../auth/auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dtos/users.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signIn(credentials: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    signUp(newUserData: CreateUserDto): Promise<string>;
}
