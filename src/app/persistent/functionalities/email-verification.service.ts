import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { EmailVerificationModel } from '../models/email-verification';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService  extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('companies');
  }

  store<ApiResponse>(company: EmailVerificationModel) {
    return this.post<ApiResponse>(
      'EmailVerification  ',
      company
    );
  }

  show<ApiResponse>(company: any) {
    return this.get<ApiResponse>('companies/');
  }

  update<ApiResponse>(company: any) {
    return this.post<ApiResponse>('companies/', company);
  }

  remove<ApiResponse>(company: any) {
    return this.delete<ApiResponse>('companies/');
  }
}
