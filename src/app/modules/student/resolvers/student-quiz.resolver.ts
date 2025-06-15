import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { QuizDetails } from '../../shared/models/quiz-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

export const studentQuizResolver: ResolveFn<QuizDetails> = (
  route: ActivatedRouteSnapshot
): Observable<QuizDetails> => {
  const studentCourseService = inject(StudentCourseService);
  const router = inject(Router);

  const quizId = route.paramMap.get('quizId')!;
  return studentCourseService.getQuizById(quizId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
