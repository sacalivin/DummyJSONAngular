import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  loggedIn = signal(true);

  constructor(public authService: AuthService) {
    this.loggedIn.set(authService.isAuthenticated());
  }

  logout() {
    this.authService.logout();
  }
}