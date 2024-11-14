import { Component, inject } from '@angular/core';
import { lessonDetails } from '../../example-data';
import { LessonDetails } from '../../models/LessonDetails';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss'
})
export class LessonDetailsComponent {
  public lesson: LessonDetails = lessonDetails;
  public router: Router = inject(Router);
  public isLast: boolean = history.state.isLast;
}
