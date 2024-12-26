import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentLessonSideListComponent } from '../../components/student-lesson-side-list/student-lesson-side-list.component';

@Component({
  selector: 'app-student-lessons',
  standalone: true,
  imports: [StudentLessonSideListComponent, RouterOutlet],
  templateUrl: './student-lessons.component.html',
  styleUrl: './student-lessons.component.scss'
})
export class StudentLessonsComponent {}
