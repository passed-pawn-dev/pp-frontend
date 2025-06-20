import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const loggedIn = authService.isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    authService.redirectToLoginPage();
    return false;
  }
};
