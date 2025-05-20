import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { QuizDetails } from '../models/QuizDetails';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';

export const studentQuizResolver: ResolveFn<QuizDetails> = (
  route: ActivatedRouteSnapshot
): Observable<QuizDetails> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const quizId = route.paramMap.get('quizId')!;
  return courseService.getQuizById(quizId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
