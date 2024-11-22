import { Component } from '@angular/core';
import { LessonDetailsComponent } from '../lesson-details/lesson-details.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LessonSideListComponent } from '../../components/lesson-side-list/lesson-side-list.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [LessonSideListComponent, RouterOutlet],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {}
