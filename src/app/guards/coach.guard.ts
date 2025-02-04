import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { JwtDecoded } from '../modules/student/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';

export const coachGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const token = await authService.getToken();
  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;

  if (roles?.includes('coach')) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
