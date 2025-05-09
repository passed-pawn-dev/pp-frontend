import { Component, DestroyRef, computed, inject, input } from '@angular/core';
import { Course } from '../../models/Course';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseService } from '../../service/course.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-course-tile',
  standalone: true,
  imports: [RouterLink, StarRatingComponent],
  templateUrl: './student-course-tile.component.html',
  styleUrl: './student-course-tile.component.scss'
})
export class StudentCourseTileComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private courseService: CourseService = inject(CourseService);
  private messageService: MessageService = inject(MessageService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public course = input.required<Course>();

  protected buyCourse(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .buy(this.course().id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) =>
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Course bought successfully'
              }),
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Course could not be bought'
              })
          });
      });
  }
}
