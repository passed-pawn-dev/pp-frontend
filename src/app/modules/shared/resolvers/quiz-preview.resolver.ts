import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { QuizDetails } from '../models/quiz-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const quizPreviewResolver: ResolveFn<QuizDetails> = (
  route: ActivatedRouteSnapshot
): Observable<QuizDetails> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const quizId = route.paramMap.get('quizId')!;
  return courseService.getQuizById(quizId).pipe(
    catchError(() => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
