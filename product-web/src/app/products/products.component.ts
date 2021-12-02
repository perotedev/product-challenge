import { Product } from './../shared/interfaces/product.interface';
import { ProductService } from './../shared/services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: Product[];
  public displayedColumns: string[] = ['products'];

  constructor(
    private titleService: Title,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Gerenciador de Produtos')
    this.getProducts();
  }

  getProducts(){
    this.productList = this.productService.getProducts().products;
    console.log(this.productList);
  }

  getDecimalNumber(value:any){
    return parseFloat(value).toFixed(2);
  }
}
