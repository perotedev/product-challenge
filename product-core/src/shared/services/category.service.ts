import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            order: { id: "ASC" }
        });
    }
}
