import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { authGuard } from './auth/guards/auth.guard';
import { ProfileComponent } from './private/profile/profile.component';
import { HomeComponent } from './public/home/home.component';
import { ProductsComponent } from './public/products/products.component';
import { Dashboard1Component } from './public/dashboard1/dashboard1.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard1',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard1',
    component: Dashboard1Component,
    canActivate:[authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'services',
    component: ProductsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cases',
    loadChildren: () =>
      import('../app/private/cases/case.routes').then((m) => m.caseRoutes),
    canActivate: [authGuard],
  },
];
