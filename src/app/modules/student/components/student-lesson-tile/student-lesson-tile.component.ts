import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-student-lesson-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-lesson-tile.component.html',
  styleUrl: './student-lesson-tile.component.scss'
})
export class StudentLessonTileComponent {
  public lesson = input.required<Lesson>();
}
