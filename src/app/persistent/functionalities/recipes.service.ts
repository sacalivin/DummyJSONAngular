import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { Recipes } from '../models/recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipesService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('recipes');
  }

  store<ApiResponse>(recipe: Recipes) {
    return this.post<ApiResponse>('EmailVerification  ', recipe);
  }

  show<ApiResponse>(recipe: any) {
    return this.get<ApiResponse>('recipes/');
  }

  update<ApiResponse>(recipe: any) {
    return this.post<ApiResponse>('recipes/', recipe);
  }

  remove<ApiResponse>(recipe: any) {
    return this.delete<ApiResponse>('recipes/');
  }
}
