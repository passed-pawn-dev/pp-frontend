import { Component, Input, computed } from '@angular/core';
import { Course } from '../../models/Course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-course-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-course-tile.component.html',
  styleUrl: './student-course-tile.component.scss'
})
export class StudentCourseTileComponent {
  @Input({ required: true }) public course!: Course;
  protected formattedPrice = computed(() => `${this.course.price.toFixed(2)} PLN`);
}
