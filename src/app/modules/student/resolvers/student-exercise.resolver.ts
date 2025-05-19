import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Exercise } from '../models/Exercise';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';

export const studentExerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Exercise> => {
  const courseService = inject(CourseService);
  const router = inject(Router);
  const exerciseId = route.paramMap.get('exerciseId')!;

  console.log(exerciseId);

  return courseService.getExerciseById(exerciseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
