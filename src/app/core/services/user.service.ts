import { Injectable, signal } from '@angular/core';
import { BackendApiService } from '../../persistent/base/backend-api.service';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BackendApiService {
  refreshToken<ApiResponse>(refreshToken: string) {
    return this.post<any>('auth/refresh', {
      refreshToken,
      expiresInMins: 30,
    });
  }

  store<ApiResponse>(user: User) {
    return this.post<ApiResponse>('authentication', user);
  }

  currentUser<ApiResponse>() {
    return this.get<ApiResponse>('auth/me');
  }

  login<ApiResponse>(user: User) {
    return this.post<ApiResponse>('auth/login', 
      user
    );
  }
  register<ApiResponse>(user: User) {
    return this.post<ApiResponse>('customer/register', user);
  }

  remove<ApiResponse>(user: User) {
    return this.delete<ApiResponse>('authentication/token');
  }
}
