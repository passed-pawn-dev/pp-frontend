import { Component, OnInit, inject } from '@angular/core';
import { myCourse } from '../../example-data';
import { Router, RouterLink } from '@angular/router';
import { MyCourseDetails } from '../../models/MyCourseDetails';

@Component({
  selector: 'app-lesson-side-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lesson-side-list.component.html',
  styleUrl: './lesson-side-list.component.scss'
})
export class LessonSideListComponent {
  protected course: MyCourseDetails = myCourse;
  protected router: Router = inject(Router);

  protected redirect(lessonNumber: number): void {
    this.router.navigate([`${lessonNumber}`]);
  }
}
