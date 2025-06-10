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
import { ActivatedRoute } from '@angular/router';
import { CoachCourseService } from '../../services/coach-course.service';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-coach-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, ValidationErrorsComponent],
  templateUrl: './coach-lesson-form.component.html',
  styleUrl: './coach-lesson-form.component.scss'
})
export class CoachLessonFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private coachCourseService: CoachCourseService = inject(CoachCourseService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

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
                this.config.data?.lesson.lessonNumber ?? 0,
                [
                  Validators.required,
                  Validators.min(1),
                  Validators.max(this.lessonCount)
                ]
              ],
              title: [
                this.config.data?.lesson.title ?? '',
                [Validators.required, Validators.min(1)]
              ],
              preview: [this.config.data?.lesson.preview ?? false]
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: 'Lesson could not be edited.'
            });
          }
        });
      });
  }

  protected onSubmit(): void {
    if (!this.lessonForm) return;

    this.ref.close(this.lessonForm.getRawValue());
  }

  protected onCancel(): void {
    this.ref.close();
  }
}
