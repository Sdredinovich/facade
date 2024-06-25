import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';


import { TuiAlertService, TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';

import { authEffects, authFeature } from '@facade/common/data-access-common';

import { appRoutes } from './app.routes';
import { WebsocketModule } from '@facade/common/websocket';
import { environment } from '../environments/environment.prod';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(
      authEffects
    ),
    provideStore({
      router: routerReducer,
      [authFeature.name]: authFeature.reducer,
    }),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideAnimations(),
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      TuiRootModule,
      TuiAlertService,
      TuiThemeNightModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      WebsocketModule.config({
        url: environment.ws
    })
    ),
  ],
};
