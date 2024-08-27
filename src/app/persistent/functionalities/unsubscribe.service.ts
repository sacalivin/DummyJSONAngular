import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('Unsubscribe');
  }

  store<ApiResponse>(data: any) {
    return this.put<ApiResponse>('Unsubscribe', data);
  }

  show<ApiResponse>(data: any) {
    return this.get<ApiResponse>('Unsubscribe/');
  }

  update<ApiResponse>(data: any) {
    return this.post<ApiResponse>('Unsubscribe/', data);
  }

  remove<ApiResponse>(data: any) {
    return this.delete<ApiResponse>('Unsubscribe/');
  }
}
