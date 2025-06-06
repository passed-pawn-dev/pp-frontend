import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../../../environment/environment.fullstack-local';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  if (
    (token && req.url.toLowerCase().startsWith(environment.apiUrl)) ||
    req.url.toLowerCase().startsWith(environment.apiUrl + '/')
  ) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(newReq);
  }

  return next(req);
};
