import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/shared/services/product.service';
import { PreviousPageIndex } from 'src/app/shared/interfaces/previous-page.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  productCategoriesList: Category[];
  productToExclude: Product;
  filterCategory= 0;
  displayedColumns: string[] = ['products'];
  _paginas: any;
  _links_paginas: any;
  totalCount: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30];
  eventoPaginacao: PreviousPageIndex;
  pagina_atual: number;
  isLoadingResults: boolean;
  private dataSource: Product[];

  constructor(
    private titleService: Title,
    private router: Router,
    private productService: ProductService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Gerenciador de Produtos')
    this.getProducts();
    this.getProcuctCategories();
  }

  getProducts() {
    this.isLoadingResults = true;
    this.productService.getProducts(this.filterCategory).subscribe((res:any) => {
      this.dataSource = res;
      this.productList = this.dataSource.slice(0, this.pageSize);
      this.totalCount = this.dataSource.length;
      this.pagina_atual = 0;
      this.isLoadingResults = false;
    });
  }

  getProductByDescription(){
    this.isLoadingResults = true;
    let description: string = (<HTMLInputElement>document.getElementById('descriptionSearch')).value;
    if (description === undefined || description === "" || !description.trim()){
      this.getProducts();
    } else {
      this.productService.getProductsByDescription(description, this.filterCategory).subscribe((res:any) => {
        this.dataSource = res;
        this.productList = this.dataSource.slice(0, this.pageSize);
        this.totalCount = this.dataSource.length;
        this.pagina_atual = 0;
        this.isLoadingResults = false;
      });
    }
  }

  getProcuctCategories() {
    this.productService.getCategories().subscribe((res:any) => {
      this.productCategoriesList = res
    });
  }

  selectFilterCategory(value: number) {
    this.filterCategory = value;
    this.getProducts()
  }

  getDecimalNumber(value: any) {
    return parseFloat(value).toFixed(2);
  }

  setPageSizeOptions(event: any) {
    this.pageSize = event.pageSize;
    this.pagina_atual = event.pageIndex;
    this.paginator();
  }

  paginator() {
    window.scroll(0, 0);
    this.isLoadingResults = true;
    if (this.pagina_atual === 0) {
      setTimeout(() => {
        this.productList = this.dataSource.slice(0, this.pageSize);
        this.isLoadingResults = false;
      }, 1000);
    } else {
      let start = this.pagina_atual * this.pageSize;
      setTimeout(() => {
        this.productList = this.dataSource.slice(start, this.pageSize + start);
        this.isLoadingResults = false;
      }, 1000);
    }
  }

  editProduct(id: number) {
    localStorage.setItem('product_id', id.toString());
    this.router.navigate(['produtos/editar']);
  }

  openExcludeModal(content: any, element: Product) {
    this.productToExclude = element;
    this.modalService.open(content, { centered: true });
  }

  deleteProduct() {
    this.isLoadingResults = true;
    this.productService.deleteProduct(this.productToExclude.id).subscribe((res:any) => {
      if (res.affected > 0){
        this.snackMessage("Produto "+this.productToExclude.description+" excluído");
        this.getProducts();
      } else {
        this.snackMessage("Produto "+this.productToExclude.description+" NÃO pôde excluído");
      }
    });
  }

  snackMessage(message:string){
    this._snackBar.open(message, 'Fechar',{
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 4000,
    });
  }
}
