import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import * as AuthSelectors from './auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthFacade {

  store = inject(Store)

  loggedUser$ = this.store.select(AuthSelectors.selectLoggedUser)



  logIn(userData: { login: string; password: string }, fn: () => void) {
    this.store.dispatch(AuthActions.login({ userData, fn }))
  }

  getUser(){
    this.store.dispatch(AuthActions.getUser())
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
