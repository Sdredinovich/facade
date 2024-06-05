import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: ()=>import('./authorized-user-layout/authorized-user-layout.component').then((m) => m.AuthorizedUserLayoutComponent),
    // canActivate: [authGuard],

  },
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
