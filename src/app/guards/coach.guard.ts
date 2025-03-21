import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import Keycloak from 'keycloak-js';
import { JwtDecoded } from '../modules/shared/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';

export const coachGuard: CanActivateFn = async (_route, _state) => {
  const keycloak = inject(Keycloak);

  const token = keycloak.token;
  if (!token) {
    return false;
  }

  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;

  if (roles && roles.includes('coach')) {
    return true;
  } else {
    keycloak.login({
      prompt: 'login'
    });
    return false;
  }
};
