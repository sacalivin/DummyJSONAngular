import { Component } from '@angular/core';
import { ProductsService } from '../../persistent/functionalities/products.service';
import { map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard1.component.html',
  styleUrl: './dashboard1.component.scss',
})
export class Dashboard1Component {
  products$!: Observable<any[]>;

  constructor(public productsService: ProductsService) {
    this.products$ = productsService
      .list()
      .pipe(map((res: any) => res.products))
      .pipe(take(1));
    this.products$ = this.products$.pipe(take(3));
  }
}
