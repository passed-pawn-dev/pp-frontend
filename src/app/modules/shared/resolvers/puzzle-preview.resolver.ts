import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Puzzle } from '../models/puzzle.model';
import { CourseService } from '../services/course.service';

export const puzzlePreviewResolver: ResolveFn<Puzzle> = (
  route: ActivatedRouteSnapshot
): Observable<Puzzle> => {
  const courseService = inject(CourseService);
  const router = inject(Router);

  const puzzleId = route.paramMap.get('puzzleId')!;
  return courseService.getPuzzleById(puzzleId).pipe(
    catchError((_) => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
