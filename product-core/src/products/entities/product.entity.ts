import { Category } from './category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product { 
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description: string;

    @Column()
    buy_date: string;

    @Column()
    price: number;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'category' })
    category_id: number;
}