import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { of, switchMap, tap } from 'rxjs';
import { admin, user } from './auth-mock';
import { LocalStorageJwtService } from '../../services/loacal-storage-jwt.services';
import { Router } from '@angular/router';

export const loginEffect$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthActions.login),
      switchMap((payload) => {
        if (
          payload.userData.login === 'admin' &&
          payload.userData.password === 'admin'
        ) {
          return of(
            AuthActions.loginSuccess({
              res: {
                authToken: 'adminToken',
                user: admin,
              },
            })
          );
        } else if (
          payload.userData.login === 'user' &&
          payload.userData.password === 'user'
        ) {
          return of(
            AuthActions.loginSuccess({
              res: {
                authToken: 'userToken',
                user: user,
              },
            })
          );
        }

        return of(
          AuthActions.loginFailure({ error: new Error('Login failed') })
        );
      })
    ),
  { functional: true }
);

export const loginSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.res.authToken);
        router.navigateByUrl('/home');
      })
    );
  },
  { functional: true, dispatch: false }
);


export const logoutEffect$ = createEffect(
  (actions$ = inject(Actions), jwtService = inject(LocalStorageJwtService), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        jwtService.removeItem();
        router.navigate(['/login']);
        // const notDefaultTheme: Element | null = document.head.querySelector('.style-manager-theme');
        // if (notDefaultTheme) notDefaultTheme.remove();
      })
    ),
  { functional: true, dispatch: false }
);
