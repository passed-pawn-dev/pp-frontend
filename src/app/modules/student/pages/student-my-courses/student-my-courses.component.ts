import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';
import { myCourses } from '../../example-data';

@Component({
  selector: 'app-student-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-my-courses.component.html',
  styleUrl: './student-my-courses.component.scss'
})
export class StudentMyCoursesComponent {
  protected courses: MyCourse[] = myCourses;
}
