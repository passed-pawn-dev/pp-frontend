import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtDecoded } from '../../shared/models/jwt-decoded.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../../environment/environment';

export const studentGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token === undefined) {
    return false;
  }

  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined =
    decoded.resource_access[environment.keycloak.apiClientId].roles;

  if (roles && roles.includes('student')) {
    return true;
  } else {
    authService.redirectToLoginPage(true);
    return false;
  }
};
