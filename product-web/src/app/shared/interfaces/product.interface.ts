export interface Product {
    id?: number;
    description: string;
    buy_date: string;
    price: number;
    category_id: number;
    category?: string;
}

export interface ProductList {
    products: Product[];
}