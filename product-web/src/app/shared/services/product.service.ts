import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './../interfaces/product.interface';

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


  getProductById(id:number){
    return this.http.get(`${backend_url}/products/${id}`);
  }

  getProducts(){
    return this.http.get(`${backend_url}/products`);
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
