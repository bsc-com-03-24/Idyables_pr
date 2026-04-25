import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private generateToken;
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
        };
    }>;
    login(username: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
}
