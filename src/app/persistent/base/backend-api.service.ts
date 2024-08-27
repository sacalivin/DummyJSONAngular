import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  protected apiUrl: string = environment.apiUrl;
  public ls = inject(LocalStorageService);
  constructor(private http: HttpClient) {}

  post<T>(url: string, data: any) {
    return this.http.post<T>(this.apiUrl + url, data, {
      headers: this.getHeaders(),
    });
  }

  postMultipart<T>(url: string, data: any) {
    return this.http.post<T>(this.apiUrl + url, data, {
      headers: this.getMultipartHeaders(),
    });
  }

  put<T>(url: string, data: any) {
    return this.http.put<T>(this.apiUrl + url, data, {
      headers: this.getMultipartHeaders(),
    });
  }
  get<T>(url: string) {
    return this.http.get<T>(this.apiUrl + url, { headers: this.getHeaders() });
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.apiUrl + url);
  }

  getHeaders() {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',

    };
    return headers;
  }

  getMultipartHeaders() {
    let headers = {
      //'Content-Type': 'multipart/form-data',
      //mimeType: 'multipart/form-data',
    };
    return headers;
  }

  sendAjax() {}
}
