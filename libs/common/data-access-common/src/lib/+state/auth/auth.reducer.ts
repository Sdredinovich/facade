import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from './sign.auth.model';

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
  error: string | null;
  authToken: string;
  loggedUser: User;
}

export const authInitialState: authState = {
  authStatus: LoadingStatus.INIT,
  error: null,
  authToken: '',
  loggedUser: { login: '', email: '', name: '', city: '', id: 0 },
};

export const reducer = createReducer(
  authInitialState,
  on(AuthActions.login, (state) => ({
    ...state,
    authStatus: LoadingStatus.LOADING,
  })),
  on(AuthActions.loginSuccess, (state, { res }) => ({
    ...state,
    authStatus: LoadingStatus.LOADED,
    authToken: res.authToken,
    loggedUser: res.user,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    ...authInitialState,
  })),
  on(AuthActions.getUser, (state) => ({
    ...state,
  })),
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    authStatus: LoadingStatus.LOADED,
    loggedUser: user,
  })),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
