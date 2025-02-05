import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { CourseService } from '../service/course.service';
import { Observable } from 'rxjs';
import { Exercise } from '../models/Exercise';

export const coachExerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Exercise> => {
  const courseService = inject(CourseService);
  const exerciseId = route.paramMap.get('id') || '1';
  return courseService.getExerciseById(exerciseId);
};
