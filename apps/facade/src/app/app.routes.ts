import { authGuard } from '@facade/common/data-access-common';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@facade/common/feature-layouts').then(
        (m) => m.InnerLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'homePage',
        pathMatch: 'full',
      },
      {
        path: 'homePage',
        loadComponent: () =>
          import('@facade/system-feature/feature-homePage').then(m=>m.FeatureHomePageComponent)
      }
    ],
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
