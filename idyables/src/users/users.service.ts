import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {}

constructor(
        
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        ) {}

        async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
        }

        async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
        }

        async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
        }

        async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id);
        await this.usersRepository.update(id, updateUserDto);
        return await this.findOne(id);
        }

        async remove(id: number): Promise<{ message: string }> {
        await this.findOne(id);
        await this.usersRepository.delete(id);
        return { message: `User ${id} deleted successfully` };
        }