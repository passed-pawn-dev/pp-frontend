import { Component, computed } from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { course } from '../../example-data';
import { StudentCourseReviewComponent } from '../../components/student-course-review/student-course-review.component';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [StudentCourseReviewComponent],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.scss'
})
export class StudentCourseComponent {
  protected course: CourseDetails = course;
  protected formattedPrice = computed(() => `${this.course.price.toFixed(2)} PLN`);
}
