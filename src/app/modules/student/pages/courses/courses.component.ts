import { Component } from '@angular/core';
import { Course } from '../../models/Course';
import { courses } from '../../example-data';
import { CourseTileComponent } from '../../components/course-tile/course-tile.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseTileComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  protected courses: Course[] = courses;
}
