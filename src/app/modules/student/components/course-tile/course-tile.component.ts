import { Component, Input, computed } from '@angular/core';
import { Course } from '../../models/Course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-tile.component.html',
  styleUrl: './course-tile.component.scss'
})
export class CourseTileComponent {
  @Input({ required: true }) public course!: Course;
  protected formattedPrice = computed(() => `${this.course.price.toFixed(2)} PLN`);
}
