import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseVideoElementViewRequestDto } from '../models/course-video-element-view-request-dto.model';

export const privateVideoPreviewResolver: ResolveFn<
  CourseVideoElementViewRequestDto
> = (route: ActivatedRouteSnapshot): Observable<CourseVideoElementViewRequestDto> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const videoId = route.paramMap.get('videoId')!;

  return courseService.getVideoById(videoId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
