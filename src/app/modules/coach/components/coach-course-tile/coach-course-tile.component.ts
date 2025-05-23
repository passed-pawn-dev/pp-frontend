import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-coach-course-tile',
  imports: [CourseDifficultyComponent, RouterLink, StarRatingComponent],
  templateUrl: './coach-course-tile.component.html',
  styleUrl: './coach-course-tile.component.scss'
})
export class CoachCourseTileComponent {
  @Input() public course!: Course;
  @Output() public delete = new EventEmitter<string>();

  protected onDelete(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    this.delete.emit(this.course.id.toString());
  }

  protected stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
