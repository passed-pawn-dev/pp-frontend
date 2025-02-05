import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { Exercise } from '../models/Exercise';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';

export const studentExerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Exercise> => {
  const courseService = inject(CourseService);
  const exerciseId = route.paramMap.get('id') || '1';
  return courseService.getExerciseById(exerciseId);
};
