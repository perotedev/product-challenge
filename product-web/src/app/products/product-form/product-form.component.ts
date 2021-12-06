import { TransformDate } from './../../shared/utils/transformDate';
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
  categoriesList: Category[];
  description: string;
  buyDate: Date;
  price: number;
  categoryId: number;
  isLoadingResults = false;
  pageName = "Cadastrar Produto";
  category = "Selecionar categoria...";
  isEdit = false;
  private idEdit: number;
  private productForm: Product;

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
      let productStorage: any = localStorage.getItem('productEdit');
      this.productForm = JSON.parse(productStorage);
      let id: any = this.productForm.id;
      this.idEdit = Number.parseInt(id);
      this.populaForm();
    }
  }
  
  ngOnDestroy(): void {
    localStorage.clear();
  }

  sendProduct(){
    this.setProduct();
    if (this.formValidation()){
      let product: Product = {
        description: this.productForm.description,
        buyDate: new Date(this.productForm.buyDate).toISOString(),
        price: this.productForm.price,
        categoryId: this.productForm.categoryId?this.productForm.categoryId:this.categoryId
      };

      if (this.isEdit){
        product.id = this.idEdit;
        this.updateProduct(product);
      } else {
        console.log(product);
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
      categoryId: (<HTMLSelectElement>document.getElementById('validationCategory')).selectedIndex
    };
    console.log({set: productForm});
    this.productForm = productForm;
  }

  formValidation(){
    let validation = true;
    const array = Object.values(this.productForm);
    console.log(array);
    array.forEach( element => {
      if (element === undefined || element === ""){
        validation = false;
      }
    })
    if (!this.isEdit && array[3]<1){
      validation = false;
    }
    
    return validation;
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

  transformDate(value:string){
    let data = value.split('T')
    return data[0];
  }
}
