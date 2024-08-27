import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('products');
  }

  store<ApiResponse>(product: Products) {
    return this.post<ApiResponse>('EmailVerification  ', product);
  }

  show<ApiResponse>(product: any) {
    return this.get<ApiResponse>('products/');
  }

  update<ApiResponse>(product: any) {
    return this.post<ApiResponse>('products/', product);
  }

  remove<ApiResponse>(product: any) {
    return this.delete<ApiResponse>('products/');
  }
}
