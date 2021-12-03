import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngular } from '../shared/styles/material-angular.module';
import { ProductsComponent } from './products.component';

@NgModule({
imports: [
        CommonModule,
        MaterialAngular
    ],
    declarations: [ProductsComponent]
})
export class ProductsModule { }