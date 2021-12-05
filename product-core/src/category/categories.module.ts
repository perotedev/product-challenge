import { Category } from './../shared/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './../shared/services/category.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [
        CategoriesController,],
    providers: [CategoryService],
})
export class CategoriesModule { }
