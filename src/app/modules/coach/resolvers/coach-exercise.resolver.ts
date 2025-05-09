import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { CourseService } from '../service/course.service';
import { Observable, catchError, of } from 'rxjs';
import { Puzzle } from '../models/Puzzle';

export const coachExerciseResolver: ResolveFn<Puzzle> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Puzzle> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const exerciseId = route.paramMap.get('exerciseId')!;
  return courseService.getExerciseById(exerciseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
