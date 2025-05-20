import { Component, DestroyRef, OnInit } from '@angular/core';
import { MyCourse } from '../../models/MyCourse';

import { CourseService } from '../../service/course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StudentMyCourseTileComponent } from '../../components/student-my-course-tile/student-my-course-tile.component';

@Component({
  selector: 'app-student-my-courses',
  standalone: true,
  imports: [StudentMyCourseTileComponent],
  templateUrl: './student-my-courses.component.html',
  styleUrl: './student-my-courses.component.scss'
})
export class StudentMyCoursesComponent implements OnInit {
  protected courses: MyCourse[] = [];

  public constructor(
    private courseService: CourseService,
    private destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.courseService
      .getAllBought()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses = res;
      });
  }
}
