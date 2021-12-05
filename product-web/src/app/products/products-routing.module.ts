import { ProductListComponent } from './product-list/product-list.component';
// Importação das dependências
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos Componentes
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'cadastrar',
    component: ProductFormComponent
  },
  {
    path: 'editar',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
