import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-coach-course-tile',
  imports: [CourseDifficultyComponent, RouterLink],
  templateUrl: './coach-course-tile.component.html',
  styleUrl: './coach-course-tile.component.scss'
})
export class CoachCourseTileComponent {
  @Input() public course!: Course;
  @Output() public delete = new EventEmitter<string>();

  public onDelete(): void {
    this.delete.emit(this.course.id);
  }
}
