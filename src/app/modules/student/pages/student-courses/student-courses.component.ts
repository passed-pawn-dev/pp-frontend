import { Component } from '@angular/core';
import { Course } from '../../models/Course';
import { courses } from '../../example-data';
import { StudentCourseTileComponent } from '../../components/student-course-tile/student-course-tile.component';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [StudentCourseTileComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent {
  protected courses: Course[] = courses;
}
