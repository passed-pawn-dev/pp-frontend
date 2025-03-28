import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtDecoded } from '../modules/shared/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/services/auth.service';

export const coachGuard: CanActivateFn = async (_route, _state) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token === undefined) {
    return false;
  }

  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;

  if (roles && roles.includes('coach')) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
