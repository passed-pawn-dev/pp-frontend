import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

export const loggedInGuard: CanActivateFn = (_route, _state) => {
  const keycloak = inject(Keycloak);

  if (keycloak.authenticated) {
    return true;
  } else {
    keycloak.login();
    return false;
  }
};
