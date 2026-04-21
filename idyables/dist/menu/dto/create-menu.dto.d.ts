import { FoodCategory } from '../entities/menu.entity';
export declare class CreateMenuDto {
    name: string;
    description?: string;
    price: number;
    category: FoodCategory;
    isAvailable?: boolean;
    vendorId: number;
}
