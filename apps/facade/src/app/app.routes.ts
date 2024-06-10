import { authGuard } from '@facade/common/data-access-common';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@facade/common/feature-layouts').then(
        (m) => m.InnerLayoutComponent
      ),
    canActivate: [authGuard],
    children: [],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@facade/feature-auth').then((m) => m.LoginPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
