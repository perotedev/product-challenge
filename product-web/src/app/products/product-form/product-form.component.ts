import { TransformDate } from './../../shared/utils/transformDate';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoriesList: Category[];
  formGroup: FormGroup;
  pageName = "Cadastrar Produto";
  isLoadingResults = false;
  isEdit = false;
  private idEdit: number;

  constructor(
    private productService: ProductService,
    private route: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit() {
    this.initForm();
    this.getProductCategories();
    
    if (this.route.url.includes('editar')){
      this.pageName = "Editar Produto";
      this.isEdit = true;
      let productStorage: any = localStorage.getItem('productEdit');
      productStorage = JSON.parse(productStorage);
      this.idEdit = productStorage.id;
      this.populateForm(productStorage);
    }
  }
  
  initForm(){
    this.formGroup = this.formBuilder.group({
      description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      buyDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    })
  }

  populateForm(productForm: Product){
    this.formGroup.patchValue({
      description: productForm.description,
      buyDate: TransformDate.getHumanDate(productForm.buyDate),
      price: productForm.price,
      categoryId: productForm.categoryId
    })
  }
  
  getProductCategories(){
    this.productService.getCategories().subscribe((res:any) => {
      this.categoriesList = res;
    });
  }

  sendProduct(){
    let product: Product = this.formGroup.value;
    if (this.formValidation()){  
      if (this.isEdit){
        product.id = this.idEdit;
        this.updateProduct(product);
      } else {
        this.createProduct(product);
      }
    } else {
      this.isLoadingResults = false;
      this.snackMessage("Por favor, preencha todos os campos!");
    }
  }

  formValidation(){
    let validation = true;
    const array = Object.values(this.formGroup.value);
    array.forEach( element => {
      if (element === null || element === undefined || element === ""){
        validation = false;
      }
    })    
    return validation;
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
  
  snackMessage(message:string){
    this._snackBar.open(message, 'Fechar',{
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }
  
  ngOnDestroy(): void {
    localStorage.removeItem('productEdit');
  }
}
