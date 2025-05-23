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
import { tokenInterceptor } from './modules/core/interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { environment } from '../../environment/environment';
import { definePreset } from '@primeng/themes';

const customPrimengPreset = definePreset(Lara, {
  semantic: {
    primary: {
      0: '#ffffff',
      50: '#f5f1ff',
      100: '#e8ddfe',
      200: '#d2bafe',
      300: '#b68afe',
      400: '#8a52fd',
      500: '#6015f4',
      600: '#5513d9',
      700: '#4610b5',
      800: '#360d8a',
      900: '#270964'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: customPrimengPreset,
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
        checkLoginIframe: true,
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
