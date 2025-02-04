import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { from, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return from(authService.getToken()).pipe(
    switchMap((authToken: string) => {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next(newReq);
    })
  );
};
