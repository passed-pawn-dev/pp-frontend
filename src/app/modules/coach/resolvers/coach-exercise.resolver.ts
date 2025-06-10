import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { CoachCourseService } from '../services/coach-course.service';
import { Observable, catchError, of } from 'rxjs';
import { Puzzle } from '../models/puzzle.model';

export const coachExerciseResolver: ResolveFn<Puzzle> = (
  route: ActivatedRouteSnapshot
): Observable<Puzzle> => {
  const coachCourseService = inject(CoachCourseService);
  const router = inject(Router);

  const exerciseId = route.paramMap.get('exerciseId')!;
  return coachCourseService.getExerciseById(exerciseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
