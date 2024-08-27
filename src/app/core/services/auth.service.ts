import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, Roles } from '../../auth/models/user';
import { LocalStorageService } from '../../persistent/base/local-storage.service';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal(false); //!environment.production
  rolesCode = [Roles.ADMIN, Roles.MANAGER, Roles.USER];
  access_token: string = '';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private router = inject(Router);

  constructor(
    public userService: UserService,
    private ls: LocalStorageService
  ) {
   
  this.isAuthenticated.set(this.isLoggedIn());
    
  }

  login<ApiResponse>(user: User) {
    this.userService.login(user).subscribe({
      next: (value: any) => {
        this.ls.dataSave(this.JWT_TOKEN, value);
        this.loggedUser = user.email;
        this.router.navigate(['dashboard1']);
        this.isAuthenticated.set(true);
      },
      error: (err) => {
        this.isAuthenticated.set(true);

        alert('login unsuccessful');
      },
    });
  }

  register<ApiResponse>(user: User) {
    this.userService.register(user).subscribe({
      next: (value) => {
        alert('Customer Created');

        this.router.navigate(['login']);
      },
      error: (err) => {
        alert('Error while creating customer');
      },
    });
  }

  logout() {
    console.log('logout success');
    this.ls.dataRemove(this.JWT_TOKEN);
    this.router.navigate(['login']);
    this.isAuthenticated.set(false);
  }
  getCurrentAuthUser() {
    return this.userService.currentUser().subscribe({
      next: (value) => {
        alert(value);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.userService
      .refreshToken(refreshToken)
      .pipe(tap((tokens: any) => this.ls.dataSave(this.JWT_TOKEN, tokens)))
      .subscribe();
  }
}
