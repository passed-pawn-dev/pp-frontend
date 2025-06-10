import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { CourseDetails } from '../models/course-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CoachCourseService } from '../services/coach-course.service';

export const coachCourseResolver: ResolveFn<CourseDetails> = (
  route: ActivatedRouteSnapshot
): Observable<CourseDetails> => {
  const coachCourseService = inject(CoachCourseService);
  const router = inject(Router);

  const courseId = route.paramMap.get('courseId')!;
  return coachCourseService.getById(courseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
