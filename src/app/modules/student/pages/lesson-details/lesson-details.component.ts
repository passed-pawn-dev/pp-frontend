import { Component, OnInit, inject } from '@angular/core';
import { lessonDetails } from '../../example-data';
import { LessonDetails } from '../../models/LessonDetails';
import { Router, RouterLink } from '@angular/router';
import { LessonSideListComponent } from '../../components/lesson-side-list/lesson-side-list.component';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss'
})
export class LessonDetailsComponent {
  protected lesson: LessonDetails = lessonDetails;
}
