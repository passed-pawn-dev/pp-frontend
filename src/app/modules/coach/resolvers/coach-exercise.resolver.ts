import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable, catchError, of } from 'rxjs';
import { Puzzle } from '../models/puzzle.model';

export const coachExerciseResolver: ResolveFn<Puzzle> = (
  route: ActivatedRouteSnapshot
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
