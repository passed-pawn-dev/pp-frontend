import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { CourseDetails } from '../models/CourseDetails';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';

export const coachCourseResolver: ResolveFn<CourseDetails> = (
  route: ActivatedRouteSnapshot
): Observable<CourseDetails> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const courseId = route.paramMap.get('id')!;
  return courseService.getById(courseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
