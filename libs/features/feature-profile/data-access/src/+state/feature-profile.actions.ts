import { createActionGroup, props } from '@ngrx/store';
import { UserProfile } from '../feature-profile.model';

export const FeatureProfileActions = createActionGroup({
  source: 'FeatureProfile',
  events: {
    getProfile: props<{ id: number }>(),
    getProfileSuccess: props<{ response: UserProfile }>(),
    getProfilefailure: props<{ error: Error }>(),
  },
});
