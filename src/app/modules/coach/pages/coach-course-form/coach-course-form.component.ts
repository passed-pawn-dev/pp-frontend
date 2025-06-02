import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';
import { CoachCourseService } from '../../services/coach-course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ValidationErrorsComponent,
    RouterLink
  ],
  templateUrl: './coach-course-form.component.html',
  styleUrl: './coach-course-form.component.scss'
})
export class CoachCourseFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private coachCourseService = inject(CoachCourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected courseId: string | null = null;

  protected courseForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      eloRangeStart: [null, [Validators.min(0), Validators.max(3400)]],
      eloRangeEnd: [null, [Validators.min(0), Validators.max(3400)]]
    },
    { validators: this.eloRangeValidator() }
  );

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id: string | null = params.get('courseId');
        this.courseId = id;
        if (id) {
          const existingCourse = this.route.snapshot.data['course'];
          this.courseForm.patchValue(existingCourse);
        }
      });
  }

  // TODO add message
  private eloRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get('eloRangeStart')?.value;
      const end = group.get('eloRangeEnd')?.value;

      const isStartLessThanEnd = start === null || end === null || start < end;

      if (!isStartLessThanEnd) {
        return { eloRangeInvalid: true };
      }

      return null;
    };
  }

  protected onSubmit(): void {
    if (this.courseId === null) {
      this.coachCourseService
        .create(this.courseForm.getRawValue())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (_) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Course created successfully'
            });
            this.router.navigate(['coach/courses']);
          },
          error: (_) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Failed to create course'
            })
        });
    } else {
      this.coachCourseService
        .update(this.courseId, this.courseForm.getRawValue())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (_) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Course updated successfully'
            });
            this.router.navigate(['coach/courses']);
          },
          error: (_) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Failed to update course'
            })
        });
    }
  }
}
