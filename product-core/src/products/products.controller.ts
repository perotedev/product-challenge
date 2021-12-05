import { Product } from './../shared/entities/product.entity';
import { ProductService } from '../shared/services/product.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';


@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService){}

    @Get()
    async findAll(@Query('filter') filter:number): Promise<Product[]> {
        return this.productService.findAll(filter);
    }

    @Get(':id')
    async getById(@Param('id') id:number): Promise<Product> {
        return this.productService.findById(id);
    }

    @Post('get-by-description')
    @HttpCode(200)
    async getByDescription(@Body('filter') filter:string, @Body('category') category:number): Promise<Product[]> {
        return this.productService.findByDescription(filter, category);
    }
    
    @Post()
    async create(@Body() product:Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Put()
    async update(@Body() product:Product): Promise<any> {
        return this.productService.update(product); 
    }

    @Delete(':id')
    @HttpCode(202)
    async delete(@Param('id') id:number){
        return this.productService.delete(id);
    }
}
