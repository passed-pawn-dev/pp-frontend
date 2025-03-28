import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { JwtDecoded } from '../modules/shared/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';

export const studentGuard: CanActivateFn = async (_route, _state) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token === undefined) {
    return false;
  }

  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;

  if (roles && roles.includes('student')) {
    return true;
  } else {
    authService.redirectToLoginPage(true);
    return false;
  }
};
