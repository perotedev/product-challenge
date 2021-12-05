export interface Product {
    id?: number;
    description: string;
    buy_date: Date;
    price: number;
    category_id: number;
    category?: string;
}

export interface ProductList {
    products: Product[];
}