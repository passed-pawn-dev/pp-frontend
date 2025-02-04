import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ButtonModule } from 'primeng/button';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private courseId: string | null = null;

  protected courseForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required]]
  });

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: string | null = params.get('id');
      this.courseId = id;
      if (id) {
        this.courseService.getById(id).subscribe((res) => {
          this.courseForm.patchValue(res);
        });
      }
    });
  }

  protected onSubmit(): void {
    if (this.courseId === null) {
      this.courseService.create(this.courseForm.getRawValue()).subscribe((res) => {
        this.router.navigate(['coach/courses']);
      });
    } else {
      this.courseService
        .update(this.courseId, this.courseForm.getRawValue())
        .subscribe((res) => {
          this.router.navigate(['coach/courses']);
        });
    }
  }
}
