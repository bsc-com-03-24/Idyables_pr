import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersService: UsersService, usersRepository: Repository<User>, jwtService: JwtService);
    private generateToken;
    register(registerDTO: RegisterDto): Promise<any>;
    login(username: string, password: string): Promise<any>;
}
