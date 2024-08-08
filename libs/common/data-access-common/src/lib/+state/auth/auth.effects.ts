import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse, SignLoginResponse } from './auth.model';

export const loginEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(HttpClient)) =>
    actions$.pipe(
      ofType(AuthActions.login),
      switchMap((payload) => {
        return api
          .post<SignLoginResponse>(
            'https://social-network.samuraijs.com/api/1.0/auth/login',
            payload.userData
          )
          .pipe(
            map(
              (res) => {
                if (res.resultCode === 0) {
                  return AuthActions.auth();
                } else if (res.resultCode === 10) {
                  return AuthActions.getCaptcha();
                } else {
                  payload.fn('Ошибка авторизации');
                  return AuthActions.loginFailure({ error: returnError(res) });
                }
              },
              catchError((error: Error) => {
                return of(AuthActions.loginFailure({ error }));
              })
            )
          );
      })
    ),
  { functional: true }
);

export const loginSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/dashboard/homePage');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getCaptchaEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(AuthActions.getCaptcha),
      switchMap(() => {
        return api
          .get<{ url: string }>(
            'https://social-network.samuraijs.com/api/1.0/security/get-captcha-url'
          )
          .pipe(
            map((res) => AuthActions.getCaptchaSuccess({ captcha: res.url }))
          );
      })
    );
  },
  { functional: true }
);

export const logoutEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(HttpClient)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return api
          .delete('https://social-network.samuraijs.com/api/1.0/auth/login')
          .pipe(
            map(() => {
              return AuthActions.logoutSuccess();
            })
          );
      })
    ),
  { functional: true }
);

export const logoutSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        router.navigateByUrl('/login');
      })
    ),
  { functional: true, dispatch: false }
);

export const auth$ = createEffect(
  (
    actions$ = inject(Actions),
    api = inject(HttpClient),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(AuthActions.auth),
      switchMap(() => {
        return api
          .get<AuthResponse>(
            'https://social-network.samuraijs.com/api/1.0/auth/me'
          )
          .pipe(
            map((res) => {
              if (res.resultCode === 0) {
                router.navigateByUrl('/dashboard/homePage');
                return AuthActions.authSuccess({ res });
              }
              return AuthActions.authFailure({ error: returnError(res) });
            }),
            catchError((error: Error) => {
              return of(AuthActions.authFailure({ error }));
            })
          );
      })
    ),
  { functional: true }
);

const returnError = (res: any) =>
  new HttpErrorResponse({
    error: res.messages[0],
    headers: undefined,
    status: 401,
    statusText: res.messages[0],
    url: 'https://social-network.samuraijs.com/api/1.0/auth/me',
  });
