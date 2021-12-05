// Importação das dependências
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Importação dos Componentes
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Importação dos Módulos com children
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'produtos',
    component: ProductsComponent,
    loadChildren: (() => import('./products/products.module').then((m) => ProductsModule))
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
