import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductsService } from '../../persistent/functionalities/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products$!: Observable<any[]>;

  constructor(public productsService: ProductsService) {
    this.products$ = productsService
      .list()
      .pipe(map((res: any) => res.products));
  }
}
