
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductList } from './../interfaces/product.interface';

const backend_url = environment.backend;

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
    return this.http.get(`${backend_url}/categories`);
  }

  createProduct(product:Product){
    return this.http.post(`${backend_url}/products`, product, this.httpOptions);
  }

  getProductById(id:number){
    return this.http.get(`${backend_url}/products/${id}`);
  }

  getProducts(filter:number){
    if (filter !== undefined && filter > 0){
      return this.http.get(`${backend_url}/products?filter=${filter}`);
    } else {
      return this.http.get(`${backend_url}/products`);
    }
  }

  getProductsByDescription(filter:string, category:number){
    const arrayPost = {
      filter: filter,
      category: category
    }
    return this.http.post(`${backend_url}/products/get-by-description`, arrayPost, this.httpOptions);
  }

  updateProduct(product: Product){
    return this.http.put(`${backend_url}/products`, product, this.httpOptions);
  }

  deleteProduct(id:number|any){
    return this.http.delete(`${backend_url}/products/${id}`);
  }
}
