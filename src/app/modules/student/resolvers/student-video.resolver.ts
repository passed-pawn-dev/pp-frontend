import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { QuizDetails } from '../models/quiz-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

export const studentVideoResolver: ResolveFn<QuizDetails> = (
  route: ActivatedRouteSnapshot
): Observable<QuizDetails> => {
  const studentCourseService = inject(StudentCourseService);
  const router = inject(Router);

  const videoId = route.paramMap.get('videoId')!;
  return studentCourseService.getVideoById(videoId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
