import { Routes } from '@angular/router';

import { Component, createComponent } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';


export const caseRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ViewComponent,
  },
  {
    path: 'create',
    component: CreateComponent
  }
];
