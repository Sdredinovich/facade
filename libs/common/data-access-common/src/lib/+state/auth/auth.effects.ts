import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { admin, user } from './auth-mock';
import { LocalStorageJwtService } from '../../services/loacal-storage-jwt.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from './auth.selectors';

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

        payload.fn();

        return of(
          AuthActions.loginFailure({ error: new Error('Login failed') })
        );
      })
    ),
  { functional: true }
);

export const loginSuccessEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorageJwtService = inject(LocalStorageJwtService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.res.authToken);
        router.navigateByUrl('/dashboard/homePage');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logoutEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    jwtService = inject(LocalStorageJwtService),
    router = inject(Router)
  ) =>
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

export const getUser$ = createEffect(
  (
    localStorageJwtService = inject(LocalStorageJwtService),
    actions$ = inject(Actions),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(AuthActions.getUser),
      withLatestFrom(store.select(selectAuthStatus)),
      switchMap(([, authStatus]) => {
        if (authStatus !== 'loaded') {
          return localStorageJwtService.getItem() === 'adminToken'
            ? of(AuthActions.getUserSuccess({ user: admin }))
            : of(AuthActions.getUserSuccess({ user: user }));
        }
        return of();
      })
    ),
  { functional: true }
);
