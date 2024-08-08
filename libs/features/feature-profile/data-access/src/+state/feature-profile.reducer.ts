import { createFeature, createReducer, on } from '@ngrx/store';
import { FeatureProfileActions } from './feature-profile.actions';
import { LoadingStatus} from '@facade/common/data-access-common';
import { UserProfile } from '../feature-profile.model';

export const featureProfileFeatureKey = 'featureProfile';

export interface State {
  status: LoadingStatus;
  profile: UserProfile | null;
  error: Error | null;
}

export const initialState: State = {
  status: LoadingStatus.INIT,
  profile: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(FeatureProfileActions.getProfile, (state) => ({
    ...state,
    status: LoadingStatus.LOADING,
  })),
  on(FeatureProfileActions.getProfileSuccess, (state, { response }) => ({
    ...state,
    status: LoadingStatus.LOADED,
    pforile: response,

  })),
  on(FeatureProfileActions.getProfilefailure, (state, { error }) => ({
    ...state,
    status: LoadingStatus.ERROR,
    error,
  }))
  // ==============================
);

export const featureProfileFeature = createFeature({
  name: featureProfileFeatureKey,
  reducer,
});
