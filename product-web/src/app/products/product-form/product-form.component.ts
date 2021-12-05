import { TransformDate } from './../../shared/utils/transformDate';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fakeProducts } from './../../../environments/fake-data';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

const productEditTest = fakeProducts;
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoriesList: Category[];
  description: string;
  buyDate: Date;
  price: number;
  categoryId: number;
  isLoadingResults = false;
  pageName = "Cadastrar Produto";
  category = "Selecionar categoria...";
  isEdit = false;
  private productForm: any;
  private idEdit: any;

  constructor(
    private productService: ProductService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit() {
    this.getProductCategories();

    if (this.route.url.includes('editar')){
      this.pageName = "Editar Produto";
      this.isEdit = true;
      this.idEdit = localStorage.getItem('product_id');
      this.getProductById(this.idEdit);
      this.populaForm();
    }
  }
  
  ngOnDestroy(): void {
    localStorage.removeItem('product_id');
  }

  sendProduct(){
    this.setProduct();
    if (this.formValidation()){
      const product: Product = {
        description: this.productForm.description,
        buyDate: new Date(this.productForm.buyDate).toISOString(),
        price: this.productForm.price,
        categoryId: this.categoryId
      };

      if (this.isEdit){
        this.updateProduct(product);
      } else {
        this.createProduct(product);
      }
    } else {
      this.isLoadingResults = false;
      this.snackMessage("Por favor, preencha todos os campos!");
    }
  }

  createProduct(product:Product){
    this.isLoadingResults = true;
    this.productService.createProduct(product).subscribe((res:any) => {
      this.isLoadingResults = false;
      this.snackMessage("Produto "+product.description+" cadastrado com sucesso!");
      this.route.navigate(["produtos"]);
    });
  }

  updateProduct(product:Product){
    console.log(product);
    this.isLoadingResults = true;
    this.productService.updateProduct(product).subscribe((res:any) => {
      this.isLoadingResults = false;
      this.snackMessage("Produto "+product.description+" editado com sucesso!");
      this.route.navigate(["produtos"]);
    });
  }
    
  setProduct(){
    const productForm = {
      description: (<HTMLInputElement>document.getElementById('validationDescription')).value.toString(),
      buyDate: (<HTMLInputElement>document.getElementById('validationDate')).value.toString(),
      price: (<HTMLInputElement>document.getElementById('validationPrice')).value.toString(),
      categoryId: this.categoryId
    };
    this.productForm = productForm;
  }

  formValidation(){
    let validation = true;
    const array = Object.values(this.productForm);
    array.forEach( element => {
      if (element === undefined || element === ""){
        validation = false;
      }
    })
    return validation;
  }

  getProductById(id:number){
    this.productService.getProductById(id).subscribe((res:any) => {
      console.log(res);
      this.productForm = res;
    });
  }

  populaForm(){
    let description = <HTMLInputElement>document.getElementById('validationDescription');
    description.value = this.productForm.description;

    let buyDate = <HTMLInputElement>document.getElementById('validationDate');
    buyDate.value = TransformDate.getHumanDate(this.productForm.buyDate);

    let price = <HTMLInputElement>document.getElementById('validationPrice');
    price.value = this.productForm.price.toString();

    this.category = this.productForm.category.name;
    this.categoryId = this.productForm.categoryId;
  }

  snackMessage(message:string){
    this._snackBar.open(message, 'Fechar',{
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }

  getProductCategories(){
    this.productService.getCategories().subscribe((res:any) => {
      this.categoriesList = res;
    });
  }

  setProductCategory(categoryId:number){
    this.categoryId = categoryId
  }

  transformDate(value:string){
    let data = value.split('T')
    return data[0];
  }
}
