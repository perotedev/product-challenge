import { ProductsController } from './products.controller';
import { ProductService } from './product.service';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductsController],
    providers: [ProductService]
})
export class ProductsModule {}
