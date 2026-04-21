import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FoodCategory {
  STARTER = 'STARTER',
  MAIN = 'MAIN',
  DESERT = 'DESERT',
  SNACK = 'SNACK',
  DRINK = 'DRINK',
}
@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'simple-enum', enum: FoodCategory })
  category!: FoodCategory;

  @Column()
  isAvailable!: boolean;

  @Column()
  vendorId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}
