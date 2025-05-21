import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { CoachProfile } from '../models/CoachProfile';
import { CoachService } from '../service/coach.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const studentCoachProfileResolver: ResolveFn<CoachProfile> = (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
) => {
  const coachService = inject(CoachService);
  const router = inject(Router);

  const coachId = route.paramMap.get('coachId')!;
  return coachService.getProfile(coachId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
