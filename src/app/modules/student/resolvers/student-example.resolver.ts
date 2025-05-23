import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { ExampleDetails } from '../models/example-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const studentExampleResolver: ResolveFn<ExampleDetails> = (
  route: ActivatedRouteSnapshot
): Observable<ExampleDetails> => {
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
