import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions } from "./auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthFacade {

  store = inject(Store)



  logIn(userData: { login: string; password: string }) {
    this.store.dispatch(AuthActions.login({ userData }))
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
