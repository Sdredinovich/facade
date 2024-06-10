import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignAuthPayload, SignAuthUser } from './sign.auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload }>(),
    loginSuccess: props<{ res: SignAuthUser }>(),
    loginFailure: props<{ error: Error }>(),

    logout: emptyProps(),



  },
})



