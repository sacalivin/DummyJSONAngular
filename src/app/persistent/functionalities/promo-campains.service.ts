import { Injectable, signal } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PromoCampainsService extends BackendApiService {
  promoAvailable = signal(false);

  constructor(http: HttpClient) {
    super(http);

    this.campaignsExist().subscribe({
      next: (result: any) => {
        console.warn(result);
        if (result.isSuccess) {
          this.promoAvailable = signal(true);
        }

      },
    });
  }
  list<ApiResponse>() {
    return this.get<ApiResponse>('Campaings');
  }

  store<ApiResponse>(payment: any) {
    return this.postMultipart<ApiResponse>('Campaings', payment);
  }

  campaignsExist<ApiResponse>() {
    return this.get<ApiResponse>('Campaings/campaignsExist');
  }
  show<ApiResponse>(payment: any) {
    return this.get<ApiResponse>('Campaings/');
  }

  update<ApiResponse>(payment: any) {
    return this.post<ApiResponse>('Campaings/', payment);
  }

  remove<ApiResponse>(payment: any) {
    return this.delete<ApiResponse>('Campaings/');
  }
}
