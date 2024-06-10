import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions } from "./auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthFacade {

  store = inject(Store)



  logIn(userData: { login: string; password: string }, fn: () => void) {
    this.store.dispatch(AuthActions.login({ userData, fn }))
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
