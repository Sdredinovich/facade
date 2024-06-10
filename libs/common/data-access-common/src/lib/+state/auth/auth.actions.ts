import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignAuthPayload, SignAuthUser, User } from './sign.auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ userData: SignAuthPayload, fn: () => void }>(),
    loginSuccess: props<{ res: SignAuthUser }>(),
    loginFailure: props<{ error: Error }>(),

    logout: emptyProps(),

    getUser: emptyProps(),
    getUserSuccess: props<{ user: User }>(),
    getUserFailure: props<{ error: Error }>(),






  },
})



