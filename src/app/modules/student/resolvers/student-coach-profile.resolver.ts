import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { CoachProfile } from '../models/coach-profile.model';
import { StudentCoachService } from '../services/student-coach.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const studentCoachProfileResolver: ResolveFn<CoachProfile> = (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
) => {
  const studentCoachService = inject(StudentCoachService);
  const router = inject(Router);

  const coachId = route.paramMap.get('coachId')!;
  return studentCoachService.getProfile(coachId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
