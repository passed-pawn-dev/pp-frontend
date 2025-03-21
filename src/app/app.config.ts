import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  AutoRefreshTokenService,
  UserActivityService,
  provideKeycloak,
  withAutoRefreshToken
} from 'keycloak-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { environment } from '../../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-theme'
        }
      },
      ripple: false
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: environment.keycloak.authority,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false,
        redirectUri: environment.keycloak.redirectUri
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'none'
        })
      ],
      providers: [AutoRefreshTokenService, UserActivityService]
    }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    MessageService
  ]
};
