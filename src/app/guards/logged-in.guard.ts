import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const loggedInGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
