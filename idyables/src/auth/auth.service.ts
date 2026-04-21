import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 

@Injectable()
export class AuthService {

  constructor(private readonly  usersService: UsersService,
              @InjectRepository(User)
              private readonly usersRepository: Repository<User>,//to make use ofthe find members
              private readonly jwtService: JwtService,
  ) {}//automatic injection of UserService
  private generateToken(user: User) {
    const payload = { 
      username: user.username, 
      sub: user.id,
      role: user.role 
    };//generate the token that is yeat to be verified
    return this.jwtService.sign(payload);
  }
  async register(registerDTO: RegisterDto): Promise<any> {
    const { username, email, role, password } = registerDTO;// get the username, email, role and password through the registerDTO
  

    const usernameExists = await this.usersRepository.findOne({ where: { username } });//check if the username already exists in the database
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }//checking if the provided username already exists in the database, if it does the user is told

    const HashingPassword = await bcrypt.hash(password, 10);//hash the password using bcrypt with rounds of 10

    const newUser= this.usersRepository.create({ username, email, role, password: HashingPassword });//create a new user with the username, email, role, password

    const savedUser = await this.usersRepository.save(newUser);

    const token = this.generateToken(savedUser);//generate a token for the new user

    return {
      token,
      user: {id: savedUser.id, username: savedUser.username, email: savedUser.email, role: savedUser.role}
    };//return the user details
  
    }

    async login(username: string, password: string): Promise<any> {
      const user = await this.usersRepository.findOne({ where: { username } });//find the username in the database
     
      if (!user) {
        throw new UnauthorizedException('Invalid username or password');
          //if user is not found that means details are invalid
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid username or password');
      }

      const token=this.generateToken(user);
      return {token,
        user: {username: user.username,
               role: user.role}
      };
    }
}