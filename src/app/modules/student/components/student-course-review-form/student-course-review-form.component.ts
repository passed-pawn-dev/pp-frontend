import { Component, DestroyRef, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Textarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class StudentCourseReviewFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  @Output() public reviewSubmitted = new EventEmitter<void>();

  protected Array = Array;

  protected displayedRating: number = 0;
  protected currentRating: number = 0;

  protected reviewForm = this.fb.group({
    value: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    content: ['', Validators.maxLength(1000)]
  });

  protected setDisplayedRating(value: number): void {
    this.displayedRating = value;
  }

  protected setCurrentRating(value: number): void {
    this.currentRating = value;
    this.reviewForm.controls.value.setValue(value / 2);
  }

  protected onSubmit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .review(params.get('courseId')!, this.reviewForm.getRawValue())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) =>
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Review created successfully'
              }),
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Review could not be created'
              })
          });
      });
    this.reviewSubmitted.emit();
  }
}
