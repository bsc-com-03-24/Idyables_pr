export declare enum FoodCategory {
    STARTER = "STARTER",
    MAIN = "MAIN",
    DESERT = "DESERT",
    SNACK = "SNACK",
    DRINK = "DRINK"
}
export declare class Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    category: FoodCategory;
    isAvailable: boolean;
    vendorId: number;
    createdAt: Date;
    updatedAt: Date;
}
