import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthPayload, AuthResponse } from './auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    auth: emptyProps(),
    authSuccess: props<{ res: AuthResponse }>(),
    authFailure: props<{ error: Error }>(),

    login: props<{ userData: AuthPayload; fn: (text: string) => void }>(),
    loginSuccess: emptyProps(),
    loginFailure: props<{ error: Error }>(),

    logout: emptyProps(),
    logoutSuccess: emptyProps(),

    getCaptcha: emptyProps(),
    getCaptchaSuccess: props<{ captcha: string }>(),


  },
});
