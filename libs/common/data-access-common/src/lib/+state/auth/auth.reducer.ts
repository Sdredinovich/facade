import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthUserData } from './auth.model';

// export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export const enum LoadingStatus {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export const authFeatureKey = 'auth';

export interface authState {
  authStatus: LoadingStatus;
  error: Error | null;
  authToken: string;
  loggedUser: AuthUserData | null;
  captcha: string | null;
}

export const authInitialState: authState = {
  authStatus: LoadingStatus.INIT,
  error: null,
  authToken: '',
  loggedUser: null,
  captcha: null,
};

export const reducer = createReducer(
  authInitialState,
  on(AuthActions.auth, (state) => ({
    ...state,
    authStatus: LoadingStatus.LOADING,
  })),
  on(AuthActions.authSuccess, (state, { res }) => ({
    ...state,
    authStatus: LoadingStatus.LOADED,
    loggedUser: res.data,
  })),
  on(AuthActions.authFailure, (state, { error }) => ({
    ...state,
    authStatus: LoadingStatus.ERROR,
    error,
  })),
  // ====================
  on(AuthActions.login, (state) => ({
    ...state,
    authStatus: LoadingStatus.LOADING,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    authStatus: LoadingStatus.LOADED,
  })),
  // ===================

  on(AuthActions.logout, (state) => ({
    ...state,
    ...authInitialState,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    ...authInitialState,
  })),

  // ================

  on(AuthActions.getCaptcha, (state) => ({
    ...state,
    authStatus: LoadingStatus.LOADING,
  })),

  on(AuthActions.getCaptchaSuccess, (state, { captcha }) => ({
    ...state,
    captcha,
    authStatus: LoadingStatus.LOADED,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
