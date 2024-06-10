import { authGuard } from './../../../../libs/common/data-access-common/src/lib/guards/auth-guard.guard';
import { AuthorizedUserLayoutComponent } from './authorized-user-layout/authorized-user-layout.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => AuthorizedUserLayoutComponent,
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
