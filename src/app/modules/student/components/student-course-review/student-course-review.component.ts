import { Component, Input } from '@angular/core';
import { CourseReview } from '../../models/CourseReview';

@Component({
  selector: 'app-student-course-review',
  standalone: true,
  imports: [],
  templateUrl: './student-course-review.component.html',
  styleUrl: './student-course-review.component.scss'
})
export class StudentCourseReviewComponent {
  @Input({ required: true }) public review!: CourseReview;
}
