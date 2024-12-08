import { Component, computed } from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { course } from '../../example-data';
import { StudentCourseReviewComponent } from '../../components/student-course-review/student-course-review.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [StudentCourseReviewComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  protected course: CourseDetails = course;
  protected formattedPrice = computed(() => `${this.course.price.toFixed(2)} PLN`);
}
