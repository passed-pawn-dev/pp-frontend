import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { CoachCourseService } from '../../services/coach-course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-lesson-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    ValidationErrorsComponent,
    RouterLink
  ],
  templateUrl: './coach-lesson-form.component.html',
  styleUrl: './coach-lesson-form.component.scss'
})
export class CoachLessonFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private coachCourseService: CoachCourseService = inject(CoachCourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected courseId: string = '';
  protected lessonCount: number = 0;

  protected lessonForm?: FormGroup<{
    lessonNumber: FormControl<number>;
    title: FormControl<string>;
    preview: FormControl<boolean>;
  }>;

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseId = params.get('courseId')!;
        this.coachCourseService.getLessonCount(this.courseId).subscribe({
          next: (lessonCount) => {
            this.lessonCount = lessonCount + 1;
            this.lessonForm = this.fb.nonNullable.group({
              lessonNumber: [
                0,
                [
                  Validators.required,
                  Validators.min(1),
                  Validators.max(this.lessonCount)
                ]
              ],
              title: ['', [Validators.required, Validators.min(1)]],
              preview: [false]
            });
          },
          error: () => {
            this.router.navigateByUrl('/404');
          }
        });
      });
  }

  protected onSubmit(): void {
    if (!this.lessonForm) return;

    this.coachCourseService
      .addLesson(this.courseId, this.lessonForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Lesson created successfully'
          });
          this.router.navigate(['../..'], { relativeTo: this.route });
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Lesson could not be created. Ensure lesson number is correct.'
          });
        }
      });
  }
}
