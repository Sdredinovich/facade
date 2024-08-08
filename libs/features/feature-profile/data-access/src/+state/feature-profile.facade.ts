import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProfileSelectors from './feature-profile.selectors';
import { FeatureProfileActions } from './feature-profile.actions';

@Injectable({ providedIn: 'root' })
export class FeatureProfileFacade {
  store = inject(Store);
  users$ = this.store.select(ProfileSelectors.selectProfile);
  error$ = this.store.select(ProfileSelectors.selectError);
  status$ = this.store.select(ProfileSelectors.selectStatus);

  getProfile(id: number) {
    this.store.dispatch(FeatureProfileActions.getProfile({ id }));
  }
}
