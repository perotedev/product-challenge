import { Category } from './../shared/entities/category.entity';
import { CategoryService } from './../shared/services/category.service';

import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService){}

    @Get()
    async findAll(): Promise<Category[]>{
        return this.categoryService.findAll();
    }
}
