import { Component, OnInit, inject } from '@angular/core';
import { lessonDetails } from '../../example-data';
import { LessonDetails } from '../../models/LessonDetails';

@Component({
  selector: 'app-student-lesson-details',
  standalone: true,
  imports: [],
  templateUrl: './student-lesson-details.component.html',
  styleUrl: './student-lesson-details.component.scss'
})
export class StudentLessonDetailsComponent {
  protected lesson: LessonDetails = lessonDetails;
}
