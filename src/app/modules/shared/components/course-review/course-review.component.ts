import { Component, input } from '@angular/core';
import { CourseReview } from '../../../student/models/CourseReview';

@Component({
  selector: 'app-course-review',
  standalone: true,
  imports: [],
  templateUrl: './course-review.component.html',
  styleUrl: './course-review.component.scss'
})
export class CourseReviewComponent {
  public review = input.required<CourseReview>();
}
