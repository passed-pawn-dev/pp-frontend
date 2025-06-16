import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';
import { Puzzle } from '../../shared/models/puzzle.model';

export const studentPuzzleResolver: ResolveFn<Puzzle> = (
  route: ActivatedRouteSnapshot
): Observable<Puzzle> => {
  const studentCourseService = inject(StudentCourseService);
  const router = inject(Router);
  const puzzleId = route.paramMap.get('puzzleId')!;
  return studentCourseService.getPuzzleById(puzzleId).pipe(
    catchError(() => {
      router.navigate(['/404']);
      return of(null as any);
    })
  );
};
