import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Category { 
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text')
    name: string;
}