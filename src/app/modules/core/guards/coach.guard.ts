import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtDecoded } from '../../shared/models/jwt-decoded.model';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../../../environment/environment';

export const coachGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token === undefined) {
    return false;
  }

  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined =
    decoded.resource_access[environment.keycloak.apiClientId].roles;

  if (roles && roles.includes('coach')) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
