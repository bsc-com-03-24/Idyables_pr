import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
      role: user.role,
    });
  }

  async register(dto: RegisterDto) {
    const { username, email, password, role } = dto;

    const existing = await this.usersService.findByUsername(username);

    if (existing) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return {
      token: this.generateToken(newUser),
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: this.generateToken(user),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}