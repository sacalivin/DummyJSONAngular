import { Injectable } from '@angular/core';
import { BackendApiService } from '../../persistent/base/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('authentication');
  }
  currentUser<ApiResponse>() {
    return this.get<ApiResponse>('auth/me');
  }
  store<ApiResponse>(user: any) {
    return this.post<ApiResponse>('authentication', user);
  }
  update<ApiResponse>(user: FormData) {
    var userId = this.ls.getString('userId');
    return this.put<ApiResponse>('Customer/profile/' + userId, user);
  }

  show<ApiResponse>(email: any) {
    return this.get<ApiResponse>('Customer/profile/?email=' + email);
  }

  login<ApiResponse>(user: any) {
    return this.post<ApiResponse>('customer/login/', user);
  }
  register<ApiResponse>(user: any) {
    return this.post<ApiResponse>('customer/register/', user);
  }

  remove<ApiResponse>(user: any) {
    return this.delete<ApiResponse>('authentication/token/');
  }
}
