import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../+state/auth/auth.facade';
import { map } from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);
  const auth = inject(AuthFacade);

  return auth.loggedUser$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
