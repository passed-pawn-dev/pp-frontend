import { Component } from '@angular/core';
import { StudentLessonTileComponent } from '../../components/student-lesson-tile/student-lesson-tile.component';
import { myCourse } from '../../example-data';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [StudentLessonTileComponent, StudentCourseReviewFormComponent],
  templateUrl: './student-my-course.component.html',
  styleUrl: './student-my-course.component.scss'
})
export class StudentMyCourseComponent {
  protected course: MyCourseDetails = myCourse;
}
