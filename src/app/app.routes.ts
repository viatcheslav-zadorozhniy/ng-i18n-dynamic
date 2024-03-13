import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { AppRootComponent } from './app-root.component';
import { RouteMetadataKey, RouteWithMetadata, User } from './domain';

export const appRoutes: RouteWithMetadata[] = [
  {
    path: '',
    component: AppRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home').then(mod => mod.HomeComponent),
        title: () => $localize`:@@SEO.homePage.title:Homepage`,
        [RouteMetadataKey]: () => ({
          tags: [
            {
              name: 'description',
              content: $localize`:@@SEO.homePage.description:Homepage meta description`,
            }
          ]
        }),
      },
      {
        path: 'users',
        resolve: {
          users: () => inject(HttpClient).get<User[]>('https://jsonplaceholder.typicode.com/users'),
        },
        loadComponent: () => import('./pages/users').then(mod => mod.UsersComponent),
        title: () => $localize`:@@SEO.usersPage.title:Users`,
        [RouteMetadataKey]: () => ({
          tags: [
            {
              name: 'description',
              content: $localize`:@@SEO.usersPage.description:Users page meta description`,
            }
          ]
        }),
      },
    ],
  },
];
