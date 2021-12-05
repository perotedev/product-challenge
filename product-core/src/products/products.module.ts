import { Product } from './../shared/entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from '../shared/services/product.service';
import { Category } from '../shared/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductsModule {}
