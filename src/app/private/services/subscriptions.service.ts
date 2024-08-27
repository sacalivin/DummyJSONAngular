import { Injectable } from '@angular/core';
import { BackendApiService } from '../../persistent/base/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('authentication');
  }

  store<ApiResponse>(user: any) {
    return this.post<ApiResponse>('authentication', user);
  }

  show<ApiResponse>(user: any) {
    return this.get<ApiResponse>('authentication/');
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
