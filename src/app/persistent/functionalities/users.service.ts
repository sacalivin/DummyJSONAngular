import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('users');
  }

  store<ApiResponse>(user: User) {
    return this.post<ApiResponse>('EmailVerification  ', user);
  }

  show<ApiResponse>(user: any) {
    return this.get<ApiResponse>('users/');
  }

  update<ApiResponse>(user: any) {
    return this.post<ApiResponse>('users/', user);
  }

  remove<ApiResponse>(user: any) {
    return this.delete<ApiResponse>('users/');
  }
}
