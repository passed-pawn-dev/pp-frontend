import { Component, computed, input } from '@angular/core';
import { Course } from '../../models/Course';
import { RouterLink } from '@angular/router';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-student-course-tile',
  standalone: true,
  imports: [RouterLink, CourseDifficultyComponent, StarRatingComponent],
  templateUrl: './student-course-tile.component.html',
  styleUrl: './student-course-tile.component.scss'
})
export class StudentCourseTileComponent {
  public course = input.required<Course>();
  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} $`);

  protected buyCourse(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // Buy Course Logic
  }
}
