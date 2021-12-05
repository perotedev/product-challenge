import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public product: Product;
  public categoriesList: Category[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initProduct();
    this.getProductCategories();
  }

  formStringsValidations(){
  }

  createProduct(){

  }

  getProductCategories(){
    this.categoriesList = this.productService.getCategories().categories;
    console.log(this.categoriesList);
  }

  setProductCategory(category:Category){
    this.product.category_id = category.id;
    this.product.category = category.name
  }

  cleanProductCategory(){
    this.product.category_id = 0;
    this.product.category = "";
  }

  initProduct(){
    this.product.description = "";
    this.product.buy_date = new Date();
    this.product.price = 0;
    this.product.category_id = 0;
    this.product.category = "";
  }
}
