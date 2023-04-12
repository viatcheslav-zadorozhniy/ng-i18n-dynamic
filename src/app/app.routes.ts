import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AppRootComponent } from './app-root.component';
import { User } from './domain';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home').then(mod => mod.HomeComponent),
        title: () => $localize`:@@homePageSEOTitle:Homepage`, // Use `ResolveFn` instead of a string to recalculate on locale change.
      },
      {
        path: 'users',
        resolve: {
          users: () => inject(HttpClient).get<User[]>('https://jsonplaceholder.typicode.com/users'),
        },
        loadComponent: () => import('./pages/users').then(mod => mod.UsersComponent),
        title: () => $localize`:@@usersPageSEOTitle:Users`, // Use `ResolveFn` instead of a string to recalculate on locale change.
      },
    ],
  },
];
