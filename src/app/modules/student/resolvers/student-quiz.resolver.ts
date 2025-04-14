import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { QuizDetails } from '../models/QuizDetails';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';

export const studentQuizResolver: ResolveFn<QuizDetails> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<QuizDetails> => {
  const courseService = inject(CourseService);
  const quizId = route.paramMap.get('quizId') || '1';
  return courseService.getQuizById(quizId);
};
