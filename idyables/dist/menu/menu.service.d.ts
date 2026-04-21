import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
export declare class MenuService {
    private readonly menuRepository;
    constructor(menuRepository: Repository<Menu>);
    createMenu(CreateMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findOne(id: number): Promise<Menu>;
    findByVendor(vendorId: number): Promise<Menu[]>;
    update(id: number, UpdateMenuDto: UpdateMenuDto): Promise<{
        id: number;
        UpdateMenuDto: UpdateMenuDto;
    } & Menu>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
