import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const url = this.router.url;
    
    if (url === '/produtos'){
      this.router.navigate(['produtos/listar']);
    }
  }
}
