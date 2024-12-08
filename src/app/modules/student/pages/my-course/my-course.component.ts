import { Component } from '@angular/core';
import { LessonTileComponent } from '../../components/lesson-tile/lesson-tile.component';
import { myCourse } from '../../example-data';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewComponent } from '../../components/student-course-review/student-course-review.component';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';

@Component({
  selector: 'app-my-course',
  standalone: true,
  imports: [
    LessonTileComponent,
    StudentCourseReviewComponent,
    StudentCourseReviewFormComponent
  ],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})
export class MyCourseComponent {
  protected course: MyCourseDetails = myCourse;
}
