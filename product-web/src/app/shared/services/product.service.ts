import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './../interfaces/product.interface';

const backend_url = environment.backend;

const fakeProducts = {
  products: [
    {
      id: 1,
      description: "Coca-Cola Pet 1L",
      buy_date: "2021-06-11T00:04:01.665Z",
      price: 7.50,
      category_id: 1,
      category: "Alimentos"
    },
    {
      id: 2,
      description: "Smartphone Moto G8 Plus 128gb",
      buy_date: "2021-10-11T00:04:01.665Z",
      price: 1502.99,
      category_id: 2,
      category: "Eletrônicos"
    },
    {
      id: 3,
      description: "Microondas LG HTS21",
      buy_date: "2021-11-11T00:04:01.665Z",
      price: 252.54,
      category_id: 3,
      category: "Eletrodomésticos"
    }
  ]
}

const fakeCategories = {
  products: [
    {
      id: 1,
      name: "Alimentos"
    },
    {
      id: 1,
      name: "Eletrônicos"
    },
    {
      id: 1,
      name: "Eletrodomésticos"
    }
  ]
}

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
    return fakeCategories;
  }


  getProductById(id:number){
    return this.http.get(`${backend_url}/products/${id}`);
  }

  getProducts(){
    // return this.http.get(`${backend_url}/products`);
    return fakeProducts;
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
