import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { MyCourseDetails } from '../models/my-course-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const studentBoughtCourseResolver: ResolveFn<MyCourseDetails> = (
  route: ActivatedRouteSnapshot
): Observable<MyCourseDetails> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const courseId = route.paramMap.get('courseId')!;
  return courseService.getBoughtById(courseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
