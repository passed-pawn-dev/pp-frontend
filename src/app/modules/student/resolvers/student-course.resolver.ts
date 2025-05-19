import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../service/course.service';
import { CourseDetails } from '../models/CourseDetails';

export const studentCourseResolver: ResolveFn<CourseDetails> = (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
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
