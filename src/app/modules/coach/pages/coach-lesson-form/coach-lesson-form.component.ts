import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { CourseService } from '../../service/course.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coach-lesson-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    ValidationErrorsComponent,
    RouterLink
  ],
  templateUrl: './coach-lesson-form.component.html',
  styleUrl: './coach-lesson-form.component.scss'
})
export class CoachLessonFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private courseService: CourseService = inject(CourseService);

  protected lessonForm = this.fb.group({
    lessonNumber: [0, [Validators.required]]
  });

  protected onSubmit(): void {
    console.log(this.lessonForm.getRawValue());
  }
}
