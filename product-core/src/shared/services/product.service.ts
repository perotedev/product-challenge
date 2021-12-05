import { Product } from '../entities/product.entity';
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

    async findByDescription(filter:string, category:number): Promise<Product[]>{
        if (category === undefined || category < 1){
            return getRepository(Product)
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.category", "category")
                .where("product.description like :filter", { filter: `%${filter}%`})
                .orderBy('description', 'ASC')
                .getMany();
        } else {
            return getRepository(Product)
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.category", "category")
                .where("product.description like :filter", { filter: `%${filter}%`})
                .andWhere('product.categoryId = :category', { category: category})
                .orderBy('description', 'ASC')
                .getMany();
        }
    }

    async create(product:Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async update(product: Product): Promise<Product> {
        await this.productRepository.update(product.id, product);
        return this.productRepository.findOne(product.id);
    }

    async delete(id:number): Promise<any> {
        return await this.productRepository.delete(id);
    }
}
