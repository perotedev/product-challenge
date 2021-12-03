// Importação das dependências
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Importação dos Componentes
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'produtos',
    component: ProductsComponent,
    children: [
      {
        path: 'cadastrar',
        component: ProductFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
