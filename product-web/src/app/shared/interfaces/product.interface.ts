export interface Product {
    id?: number;
    description: string;
    buyDate: string;
    price: number | string;
    categoryId: number;
    category?: any;
}

export interface ProductList {
    products: Product[];
}