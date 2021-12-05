import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  buy_date: Date;
  price: number;
  category_id: number;
  isLoadingResults = false;
  pageName = "Cadastrar Produto";
  private productForm: any;
  private isEdit = false;
  private idEdit: any;

  constructor(
    private productService: ProductService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit() {
    // this.formValidators();    
    this.getProductCategories();

    if (this.route.url.includes('editar')){
      this.pageName = "Editar Produto";
      this.isEdit = true;
      this.idEdit = localStorage.getItem('product_id');
      this.getProductById(this.idEdit);
      this.populaForm();
    }
  }
  
  sendProduct(){
    this.setProduct();
    if (this.formValidation()){
      const product: Product = {
        description: this.productForm.description,
        buy_date: new Date(this.productForm.buy_date).toISOString(),
        price: Number.parseFloat(this.productForm.price),
        category_id: this.category_id
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
    this.productService.createProduct(product);
    this.isLoadingResults = false;
    this.snackMessage("Produto "+product.description+" cadastrado com sucesso!");
    this.route.navigate(["produtos"]);
  }

  updateProduct(product:Product){
    this.isLoadingResults = true;
    this.productService.updateProduct(product);
    this.isLoadingResults = false;
    this.snackMessage("Produto "+product.description+" editado com sucesso!");
    this.route.navigate(["produtos"]);
  }
    
  setProduct(){
    const productForm = {
      description: (<HTMLInputElement>document.getElementById('validationDescription')).value.toString(),
      buy_date: (<HTMLInputElement>document.getElementById('validationDate')).value.toString(),
      price: (<HTMLInputElement>document.getElementById('validationPrice')).value.toString(),
      category_id: this.category_id
    };
    this.productForm = productForm;
  }

  formValidators(){
  //   this.productFormGroup = this.formBuilder.group({
  //     desscription: ['', [Validators.required]],
  //     buy_date: ['', [Validators.required]],
  //     price: ['', [Validators.required]],
  //     category_id: ['', [Validators.required]]
  //   });
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
    // this.productForm = this.productService.getProductById(id);
    this.productForm = productEditTest.products[Number.parseInt(this.idEdit)-1];
  }

  populaForm(){
    let description = <HTMLInputElement>document.getElementById('validationDescription');
    description.value = this.productForm.description;

    let buy_date = <HTMLInputElement>document.getElementById('validationDate');
    buy_date.value = TransformDate.getHumanDate(this.productForm.buy_date);

    let price = <HTMLInputElement>document.getElementById('validationPrice');
    price.value = this.productForm.price;

    let category_id = <HTMLSelectElement>document.getElementById('validationCategory');
    category_id.selectedIndex = Number.parseInt(this.productForm.category_id); 
    category_id.selectedOptions.namedItem(this.productForm.category);
    console.log(this.productForm.category_id+" - "+this.productForm.category); 
    this.category_id = this.productForm.category_id;
  }

  snackMessage(message:string){
    this._snackBar.open(message, 'Fechar',{
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }

  changingValue($event:Event){
    console.log({event: $event});
  }

  getProductCategories(){
    this.categoriesList = this.productService.getCategories().categories;
  }

  setProductCategory(category_id:number){
    this.category_id = category_id
  }

  transformDate(value:string){
    let data = value.split('T')
    return data[0];
  }
}
