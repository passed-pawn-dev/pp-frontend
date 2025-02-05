import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
export class CoachLessonFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected lessonId: string = '';

  protected lessonForm = this.fb.group({
    lessonNumber: [0, [Validators.required, Validators.min(1)]]
  });

  protected onSubmit(): void {
    this.route.paramMap.subscribe((params) => {
      this.lessonId = params.get('id')!;
      this.courseService
        .addLesson(this.lessonId, {
          ...this.lessonForm.getRawValue(),
          excercises: []
        })
        .subscribe(() => {
          this.router.navigate(['../..']);
        });
    });
  }
}
