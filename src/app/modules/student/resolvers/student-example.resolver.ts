import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { CourseExampleDto } from '../../shared/models/course-example-dto.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';

export const studentExampleResolver: ResolveFn<CourseExampleDto> = (
  route: ActivatedRouteSnapshot
): Observable<CourseExampleDto> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const exampleId = route.paramMap.get('exampleId')!;

  return courseService.getExampleById(exampleId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
