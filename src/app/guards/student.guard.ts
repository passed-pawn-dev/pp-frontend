import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtDecoded } from '../modules/student/models/JwtDecoded';

export const studentGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const token = await authService.getToken();
  const decoded: JwtDecoded = jwtDecode(token);
  const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;

  if (roles?.includes('student')) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
