import { fakeCategories, fakeProducts } from './../../../environments/fake-data';
import { CategoryList } from './../interfaces/category.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductList } from './../interfaces/product.interface';

const backend_url = environment.backend;
const products = fakeProducts;
const categories = fakeCategories;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
  )};

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    // return this.http.get(`${backend_url}/categories`);
    return categories;
  }


  getProductById(id:number){
    return this.http.get(`${backend_url}/products/${id}`);
  }

  getProducts(){
    // return this.http.get(`${backend_url}/products`);
    return products;
  }

  updateProduct(product: Product){
    const arrayPost = {
      id: product.id,
      description: product.description,
      buy_date: product.buy_date,
      price: product.price,
      category_id: product.category_id
    }

    return this.http.put(`${backend_url}/products`, arrayPost, this.httpOptions);
  }

  deleteProduct(id:number){
    return this.http.delete(`${backend_url}/products/${id}`);
  }
}
