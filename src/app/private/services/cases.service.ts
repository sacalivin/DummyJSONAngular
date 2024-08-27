import { Injectable } from '@angular/core';
import { BackendApiService } from '../../persistent/base/backend-api.service';
import { SupportCase } from '../models/support-case';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class CasesService extends BackendApiService {
  customer$!: Observable<any>;
  customer: User = new User();

  constructor(
    http: HttpClient,
  ) {
    super(http);

    this.customer.id = this.ls.getString("userId");

  }

  getSupportCases<ApiResponse>() {
    return this.post<ApiResponse>('/Cases/', {
      CustomerId:this.customer.id,
    });
  }

  createSupportCase<ApiResponse>(supportCase: any) {
    return this.postMultipart<ApiResponse>('/createcase', supportCase);
  }

  getSupportCase<ApiResponse>(supportCase: SupportCase) {
    return this.post<ApiResponse>('/Cases/', {
      CustomerId: this.customer.id,
    });
  }

  updateSupportCase<ApiResponse>(supportCase: SupportCase) {
    return this.post<ApiResponse>(
      '/Cases/' + supportCase.TrackingNumber,
      supportCase
    ).pipe();
  }

  removeSupportCase<ApiResponse>(supportCase: SupportCase) {
    return this.delete<ApiResponse>('/Cases/' + supportCase.TrackingNumber);
  }
}
