import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/shared/services/product.service';
import { PreviousPageIndex } from 'src/app/shared/interfaces/previous-page.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private dataSource: Product[];
  public productList: Product[];
  public productCategoriesList: Category[];
  public filterCategory: number;
  public displayedColumns: string[] = ['products'];
  public _paginas: any;
  public _links_paginas: any;
  public totalCount: number;
  public pageSize = 10;
  public pageSizeOptions: number[] = [10, 20, 30];
  public eventoPaginacao: PreviousPageIndex;
  public pagina_atual: number;
  public isLoadingResults: boolean;

  constructor(
    private titleService: Title,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Gerenciador de Produtos')
    this.getProducts();
    this.getProcuctCategories();
  }

  getProducts(){
    this.isLoadingResults = true;
    this.dataSource = this.productService.getProducts().products;
    this.productList = this.dataSource.slice(0, this.pageSize);
    this.totalCount = this.dataSource.length;
    this.pagina_atual = 0;
    this.isLoadingResults = false;
    console.log(this.productList);
  }

  getProcuctCategories(){
    this.productCategoriesList = this.productService.getCategories().categories;
    console.log(this.productCategoriesList);
  }
  
  selectFilterCategory(value:number){
    this.filterCategory = value;
    console.log(this.filterCategory);
  }

  getDecimalNumber(value:any){
    return parseFloat(value).toFixed(2);
  }

  setPageSizeOptions(event:any){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pagina_atual = event.pageIndex;
    this.paginator();
  }

  paginator(){
    window.scroll(0,0);
    this.isLoadingResults = true;
    if (this.pagina_atual === 0){
      setTimeout(() => {
        this.productList = this.dataSource.slice(0, this.pageSize);
        this.isLoadingResults = false;
      }, 1000);
    } else {
      let start = this.pagina_atual*this.pageSize;
      setTimeout(() => {
        this.productList = this.dataSource.slice(start, this.pageSize+start);
        this.isLoadingResults = false;
      }, 1000);
    }
  }
}
