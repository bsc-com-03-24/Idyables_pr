"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
constructor((), usersRepository, (Repository));
{ }
async;
create(createUserDto, CreateUserDto);
Promise < User > {
    const: user = this.usersRepository.create(createUserDto),
    return: await this.usersRepository.save(user)
};
async;
findAll();
Promise < User[] > {
    return: await this.usersRepository.find()
};
async;
findOne(id, number);
Promise < User > {
    const: user = await this.usersRepository.findOne({ where: { id } }),
    if(, user) { }, throw: new NotFoundException(`User with id ${id} not found`),
    return: user
};
async;
update(id, number, updateUserDto, UpdateUserDto);
Promise < User > {
    await, this: .findOne(id),
    await, this: .usersRepository.update(id, updateUserDto),
    return: await this.findOne(id)
};
async;
remove(id, number);
Promise < { message: string } > {
    await, this: .findOne(id),
    await, this: .usersRepository.delete(id),
    return: { message: `User ${id} deleted successfully` }
};
//# sourceMappingURL=users.service.js.map