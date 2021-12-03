import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngular } from '../shared/styles/material-angular.module';
import { ProductsComponent } from './products.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialAngular,
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent,
        ProductListComponent,
        ProductFormComponent

    ],
    exports: [
        ProductsComponent
    ]
})
export class ProductsModule { }