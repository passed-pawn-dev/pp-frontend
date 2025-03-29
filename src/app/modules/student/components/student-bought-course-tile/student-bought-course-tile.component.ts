import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { MyCourse } from '../../models/MyCourse';

@Component({
  selector: 'app-student-bought-course-tile',
  standalone: true,
  imports: [RouterLink, CourseDifficultyComponent],
  templateUrl: './student-bought-course-tile.component.html',
  styleUrl: './student-bought-course-tile.component.scss'
})
export class StudentBoughtCourseTileComponent {
  public course = input.required<MyCourse>();

  protected courseProgress: number = 42;
}
