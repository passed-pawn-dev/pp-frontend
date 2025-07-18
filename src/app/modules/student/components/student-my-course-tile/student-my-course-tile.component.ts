import { Component, Input } from '@angular/core';
import { MyCourse } from '../../models/my-course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-my-course-tile',
  imports: [RouterLink],
  templateUrl: './student-my-course-tile.component.html',
  styleUrl: './student-my-course-tile.component.scss'
})
export class StudentMyCourseTileComponent {
  @Input() public course!: MyCourse;

  public courseProgress: number = 53;
}
