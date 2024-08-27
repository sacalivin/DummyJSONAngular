import { Injectable } from '@angular/core';
import { BackendApiService } from '../base/backend-api.service';
import { Payment } from '../models/payment';
import { CheckPaymentStatus } from '../models/check-payment-status';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BackendApiService {
  list<ApiResponse>() {
    return this.get<ApiResponse>('Payments');
  }

  store<ApiResponse>(payment: Payment) {
    return this.postMultipart<ApiResponse>('Payments', payment);
  }

  chechPaymentStatus<ApiResponse>(payment: CheckPaymentStatus) {
    return this.postMultipart<ApiResponse>(
      'Payments/CheckPaymentStatus',
      payment
    );
  }
  show<ApiResponse>(payment: Payment) {
    return this.get<ApiResponse>('Payments/');
  }
  // to the the amount and account number for payment
  getApplicationCharges<ApiResponse>(payment: any) {
    return this.post<ApiResponse>('Payments/charges',payment);
  }

  update<ApiResponse>(payment: Payment) {
    return this.post<ApiResponse>('Payments/', payment);
  }

  remove<ApiResponse>(payment: Payment) {
    return this.delete<ApiResponse>('Payments/');
  }
}
