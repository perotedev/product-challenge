import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categoriesList: Category[];
  public description: string;
  public buy_date: Date;
  public price: number;
  public category_id: number;
  public isLoadingResults = false;


  constructor(
    private productService: ProductService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProductCategories();
  }

  createProduct(product:Product){
    this.productService.createProduct(product);
    this.isLoadingResults = false;
    this.route.navigate(["produtos"]);
  }

  setProduct(){
    this.isLoadingResults = true;
    const product: Product = {
      description: (<HTMLInputElement>document.getElementById('validationDescription')).value.toString(),
      buy_date: new Date((<HTMLInputElement>document.getElementById('validationDate')).value.toString()),
      price: Number.parseFloat((<HTMLInputElement>document.getElementById('validationPrice')).value.toString()),
      category_id: this.category_id
    };
    if (this.formValidation(product)){
      this.createProduct(product);
    } else {
      this.isLoadingResults = false;
    }
  }

  formValidation(product:Product){
    this.snackMessage("Produto "+product.description+" cadastrado com sucesso!");
    return true;
  }

  snackMessage(message:string){
    this._snackBar.open(message, 'Fechar',{
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }

  getProductCategories(){
    this.categoriesList = this.productService.getCategories().categories;
  }

  setProductCategory(category_id:number){
    this.category_id = category_id
  }
}
