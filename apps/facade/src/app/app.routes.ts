import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
