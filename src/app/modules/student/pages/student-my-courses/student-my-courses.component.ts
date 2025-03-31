import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyCourse } from '../../models/MyCourse';

import { CourseService } from '../../service/course.service';
import { Course } from '../../models/Course';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-my-courses',
  standalone: true,
  imports: [RouterLink],
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
