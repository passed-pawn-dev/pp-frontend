import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Exercise } from '../models/exercise.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const studentExerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot
): Observable<Exercise> => {
  const courseService = inject(CourseService);
  const router = inject(Router);
  const exerciseId = route.paramMap.get('exerciseId')!;
  return courseService.getExerciseById(exerciseId).pipe(
    catchError(() => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
