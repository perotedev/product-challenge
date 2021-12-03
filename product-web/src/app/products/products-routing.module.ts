import { ProductListComponent } from './product-list/product-list.component';
// Importação das dependências
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos Componentes
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'listar',
    component: ProductListComponent,
  },
  {
    path: 'cadastrar',
    component: ProductFormComponent
  },
  {
    path: 'editar',
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
