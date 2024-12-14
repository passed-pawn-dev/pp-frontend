import { Component, inject } from '@angular/core';
import { myCourse } from '../../example-data';
import { Router, RouterLink } from '@angular/router';
import { MyCourseDetails } from '../../models/MyCourseDetails';

@Component({
  selector: 'app-student-lesson-side-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-lesson-side-list.component.html',
  styleUrl: './student-lesson-side-list.component.scss'
})
export class StudentLessonSideListComponent {
  protected course: MyCourseDetails = myCourse;
  protected router: Router = inject(Router);

  protected redirect(lessonNumber: number): void {
    this.router.navigate([`${lessonNumber}`]);
  }
}
