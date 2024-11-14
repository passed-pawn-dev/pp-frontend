import { Component } from '@angular/core';
import { LessonTileComponent } from '../../components/lesson-tile/lesson-tile.component';
import { course } from '../../example-data';
import { MyCourseDetails } from '../../models/MyCourseDetails';

@Component({
  selector: 'app-my-course',
  standalone: true,
  imports: [LessonTileComponent],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})
export class MyCourseComponent {
  public course: MyCourseDetails = course;
}
