import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';
import { courses } from '../../example-data';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent {
  public courses: MyCourse[] = courses;
}
