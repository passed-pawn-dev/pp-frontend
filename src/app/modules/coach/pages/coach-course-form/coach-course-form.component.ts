import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-coach-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ValidationErrorsComponent
  ],
  templateUrl: './coach-course-form.component.html',
  styleUrl: './coach-course-form.component.scss'
})
export class CoachCourseFormComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected courseForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required]]
  });

  protected onSubmit(): void {
    console.log(this.courseForm.getRawValue());
  }
}
