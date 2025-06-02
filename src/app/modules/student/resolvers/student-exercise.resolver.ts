import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Exercise } from '../models/exercise.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

export const studentExerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot
): Observable<Exercise> => {
  const studentCourseService = inject(StudentCourseService);
  const router = inject(Router);
  const exerciseId = route.paramMap.get('exerciseId')!;
  return studentCourseService.getExerciseById(exerciseId).pipe(
    catchError(() => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
