import { AfterViewInit, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopNavbarService {
  topNavbarVisible = signal(true);
  constructor() {}

  topNavBarToggleOff() {
    this.topNavbarVisible.set(false);
    console.log(this.topNavbarVisible());
  }
  topNavBarToggleOn() {
    this.topNavbarVisible.set(true);
    console.log(this.topNavbarVisible());
  }
}
