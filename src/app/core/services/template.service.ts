import { Injectable } from '@angular/core';
import { BackendApiService } from '../../persistent/base/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class TemplateService  extends BackendApiService {

  createCustomer(model: any) {
    return this.post('/configuration', model);
  }
  updateCustomer(model: any) {
    return this.put('/configuration', model);
  }
  getCustomer() {
    return this.post('/configuration', {});
  }
  getCustomers() {
    return this.get('/configuration');
  }
}
