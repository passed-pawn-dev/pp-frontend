import {
  Component,
  DestroyRef,
  EventEmitter,
  OnChanges,
  Output,
  inject,
  input
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Textarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseReview } from '../../models/course-review.model';

@Component({
  selector: 'app-student-course-review-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ValidationErrorsComponent,
    ButtonModule,
    Textarea
  ],
  templateUrl: './student-course-review-form.component.html',
  styleUrl: './student-course-review-form.component.scss'
})
export class StudentCourseReviewFormComponent implements OnChanges {
  private fb: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  @Output() public reviewSubmitted = new EventEmitter<CourseReview>();

  public existingReview = input<CourseReview | null>();

  protected Array = Array;

  protected displayedRating: number = 0;
  protected currentRating: number = 0;

  protected reviewForm = this.fb.group({
    value: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    content: ['', Validators.maxLength(1000)]
  });

  public ngOnChanges(): void {
    this.reviewForm.controls.value.setValue(this.existingReview()?.value || 0);
    this.reviewForm.controls.content.setValue(this.existingReview()?.content || '');
    this.currentRating = (this.existingReview()?.value || 0) * 2;
  }

  protected setDisplayedRating(value: number): void {
    this.displayedRating = value;
  }

  protected setCurrentRating(value: number): void {
    this.currentRating = value;
    this.reviewForm.controls.value.setValue(value / 2);
  }

  protected onSubmit(): void {
    if (this.existingReview()) {
      this.courseService
        .updateReview(this.existingReview()!.id, this.reviewForm.getRawValue())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (review) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Review updated successfully'
            });
            this.reviewSubmitted.emit(review);
            this.reviewForm.reset();
          },
          error: (_) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Review could not be updated'
            })
        });
    } else {
      this.route.paramMap
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((params) => {
          this.courseService
            .review(params.get('courseId')!, this.reviewForm.getRawValue())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (review) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Review created successfully'
                });
                this.reviewSubmitted.emit(review);
                this.reviewForm.reset();
              },

              error: (_) =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failure',
                  detail: 'Review could not be created'
                })
            });
        });
    }
  }
}
