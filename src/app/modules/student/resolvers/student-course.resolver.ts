import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseDetails } from '../models/course-details.model';

export const studentCourseResolver: ResolveFn<CourseDetails> = (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
): Observable<CourseDetails> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const courseId = route.paramMap.get('courseId')!;
  return courseService.getById(courseId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
