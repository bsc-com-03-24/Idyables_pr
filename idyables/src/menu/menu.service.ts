import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  //adding a new menu item
  async createMenu(CreateMenuDto: CreateMenuDto): Promise<Menu> {
    const menuItem = this.menuRepository.create(CreateMenuDto);
    return await this.menuRepository.save(menuItem);
  }

  //get all menu items
  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }
  //get a single menu item by id
  async findOne(id: number): Promise<Menu> {
    const menuItem = await this.menuRepository.findOne({ where: { id } });
    if (!menuItem) throw new NotFoundException(`menuItem #${id} not found`);
    return menuItem;
  }
  //
  async findByVendor(vendorId: number): Promise<Menu[]> {
    return this.menuRepository.find({ where: { vendorId } });
  }
  async update(id:number, UpdateMenuDto : UpdateMenuDto) {
    const menuItem = await this.menuRepository.findOne({ where: { id } });
    return this.menuRepository.save({id,UpdateMenuDto});
  }
  async remove(id:number): Promise<{message: string}>{
    await this.findOne(id);
    await this.menuRepository.delete(id);
    return {message: `user ${id} deleted successfully`}
  }
}
