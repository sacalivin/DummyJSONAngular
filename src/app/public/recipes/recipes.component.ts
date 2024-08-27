import { Component } from '@angular/core';
import { RecipesService } from '../../persistent/functionalities/recipes.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  recipes$!: Observable<any[]>;

  constructor(public recipesService: RecipesService) {
    this.recipes$ = recipesService
      .list()
      .pipe(map((res: any) => res.recipes));
  }
}
