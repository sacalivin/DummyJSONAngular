import {
  Injectable,
  afterNextRender,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  dataSave(key: string, value: [] | object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): object | null {
    let storedStringValue = localStorage.getItem(key);
    return storedStringValue ? JSON.parse(storedStringValue) : null;
  }
  getString(key: string): string {
    let storedStringValue = localStorage.getItem(key);
    if (
      typeof storedStringValue !== 'undefined' &&
      storedStringValue &&
      storedStringValue !== 'undefined'
    ) {
      console.log(storedStringValue);
      return storedStringValue ? JSON.parse(storedStringValue) : '';
    }

    return "";
    
  }
  dataRemove(key: string) {
    localStorage.removeItem(key);
  }

  save(key: string, value: [] | object): void {
   
      localStorage.setItem(key, JSON.stringify(value));
  
  }

  retrieve(key: string): any | null {
   
      let storedStringValue = localStorage.getItem(key);
      return storedStringValue ? JSON.parse(storedStringValue) : null;
    
  }
}
