import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { AuthPayload } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  store = inject(Store);

  loggedUser$ = this.store.select(AuthSelectors.selectLoggedUser);
  captcha$ = this.store.select(AuthSelectors.selectCaptcha);

  logIn(userData: AuthPayload, fn: (text: string) => void) {
    this.store.dispatch(AuthActions.login({ userData, fn }));
  }

  auth() {
    this.store.dispatch(AuthActions.auth());
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
