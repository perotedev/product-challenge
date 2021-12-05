import { Category } from './category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    buyDate: Date;

    @Column()
    price: number;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category, category => category.id)
    category?: Category;
}