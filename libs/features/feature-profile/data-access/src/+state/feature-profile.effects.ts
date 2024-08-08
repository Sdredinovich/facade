import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeatureProfileActions } from './feature-profile.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../feature-profile.model';

export const getUsersEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(HttpClient)) =>
    actions$.pipe(
      ofType(FeatureProfileActions.getProfile),
      switchMap(({id}) =>
        api
          .get<UserProfile>(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
          .pipe(
            map((response) => FeatureProfileActions.getProfileSuccess({ response })),
            catchError((error) =>
              of(FeatureProfileActions.getProfilefailure({ error }))
            )
          )
      )
    ),
  { functional: true }
);
