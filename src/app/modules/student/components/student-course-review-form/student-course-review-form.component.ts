import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';

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
  private courseService: CourseService = inject(CourseService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  protected reviewForm = this.fb.group({
    value: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    content: ['', Validators.maxLength(1000)]
  });

  protected onSubmit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService
        .review(params.get('id')!, this.reviewForm.getRawValue())
        .subscribe((res) => {});
    });
  }
}
