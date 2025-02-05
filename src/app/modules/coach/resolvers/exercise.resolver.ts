import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from '../models/Exercise';
import { CourseService } from '../service/course.service';

export const exerciseResolver: ResolveFn<Exercise> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Exercise> => {
  const courseService = inject(CourseService);
  const puzzleId = route.paramMap.get('id') || '1';
  return courseService.getExerciseById(puzzleId); // Fetch the puzzle data
};
