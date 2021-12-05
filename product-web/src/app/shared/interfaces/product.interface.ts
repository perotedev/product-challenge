import { Category } from 'src/app/shared/interfaces/category.interface';
export interface Product {
    id?: number;
    description: string;
    buy_date: string;
    price: number | string;
    category_id: number;
    category?: any;
}

export interface ProductList {
    products: Product[];
}