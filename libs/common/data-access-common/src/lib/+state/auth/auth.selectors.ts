// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromAuth from './auth.reducer';

import { authFeature } from "./auth.reducer";

// export const selectAuthState = createFeatureSelector<fromAuth.State>(
//   fromAuth.authFeatureKey
// );


export const { selectAuthStatus, selectAuthToken, selectError, selectLoggedUser, selectAuthState, selectCaptcha } = authFeature;
