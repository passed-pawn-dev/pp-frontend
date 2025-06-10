import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { ExampleDetails } from '../models/example-details.model';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

export const studentExampleResolver: ResolveFn<ExampleDetails> = (
  route: ActivatedRouteSnapshot
): Observable<ExampleDetails> => {
  const studentCourseService = inject(StudentCourseService);
  const router = inject(Router);

  const exampleId = route.paramMap.get('exampleId')!;

  return studentCourseService.getExampleById(exampleId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
