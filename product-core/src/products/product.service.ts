import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async findAll(filter:number): Promise<Product[]> {
        if (filter !== undefined && filter > 0){
            return this.productRepository.find({
                relations: ['category'],
                where: {
                    categoryId: filter
                },
                order: { id: "ASC" }
            });
        } else {
            return this.productRepository.find({
                relations: ['category'],
                order: { id: "ASC" }
            });
        }
    }

    async findById(id:number): Promise<Product> {
        return this.productRepository.findOne(id, {
            relations: ['category'],
        });
    }

    async findByDescription(filter:string): Promise<Product[]>{
        return getRepository(Product)
            .createQueryBuilder("product")
            .where("product.description like :filter", { filter: `%${filter}%`})
            .orderBy('id', 'ASC')
            .getMany();
    }

    async create(product:Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async update(product: Product): Promise<Product> {
        this.productRepository.update(product.id, product);
        return product;
    }

    async delete(id:number): Promise<any> {
        return await this.productRepository.delete(id);
    }
}
