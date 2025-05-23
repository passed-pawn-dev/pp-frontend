import { Component, input } from '@angular/core';
import { CourseReview } from '../../../student/models/course-review.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-course-review',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './course-review.component.html',
  styleUrl: './course-review.component.scss'
})
export class CourseReviewComponent {
  public review = input.required<CourseReview>();
}
