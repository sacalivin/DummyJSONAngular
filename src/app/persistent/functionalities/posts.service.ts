import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('posts');
  }

  store<ApiResponse>(product: Posts) {
    return this.post<ApiResponse>('EmailVerification  ', product);
  }

  show<ApiResponse>(product: any) {
    return this.get<ApiResponse>('posts/');
  }

  update<ApiResponse>(product: any) {
    return this.post<ApiResponse>('posts/', product);
  }

  remove<ApiResponse>(product: any) {
    return this.delete<ApiResponse>('posts/');
  }
}
