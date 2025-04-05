import { Component, Input } from '@angular/core';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { MyCourse } from '../../models/MyCourse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-my-course-tile',
  imports: [CourseDifficultyComponent, RouterLink],
  templateUrl: './student-my-course-tile.component.html',
  styleUrl: './student-my-course-tile.component.scss'
})
export class StudentMyCourseTileComponent {
  @Input() public course!: MyCourse;

  public courseProgress: number = 53;
}
