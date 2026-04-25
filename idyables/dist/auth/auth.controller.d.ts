import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    test(): {
        message: string;
    };
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
}
