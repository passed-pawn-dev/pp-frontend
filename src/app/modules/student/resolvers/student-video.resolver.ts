import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';
import { StudentVideoElementRequestDto } from '../models/student-video-element-request-dto.model';

export const studentVideoResolver: ResolveFn<StudentVideoElementRequestDto> = (
  route: ActivatedRouteSnapshot
): Observable<StudentVideoElementRequestDto> => {
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
