import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  dataSave(key: string, value: [] | object) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): object | null {
    let storedStringValue = sessionStorage.getItem(key);
    return storedStringValue ? JSON.parse(storedStringValue) : null;
  }
  getString(key: string): string {
    let storedStringValue = sessionStorage.getItem(key);

    return storedStringValue ? JSON.parse(storedStringValue) : '';
  }
  dataRemove(key: string) {
    sessionStorage.removeItem(key);
  }

  deleteAll() {
    sessionStorage.clear();
  }
}
