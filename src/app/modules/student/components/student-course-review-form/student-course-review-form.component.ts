import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student-course-review-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ValidationErrorsComponent,
    ButtonModule
  ],
  templateUrl: './student-course-review-form.component.html',
  styleUrl: './student-course-review-form.component.scss'
})
export class StudentCourseReviewFormComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected reviewForm = this.fb.group({
    value: [10, [Validators.required, Validators.min(1), Validators.max(10)]],
    content: ['', Validators.maxLength(1000)]
  });

  protected onSubmit(): void {}
}
