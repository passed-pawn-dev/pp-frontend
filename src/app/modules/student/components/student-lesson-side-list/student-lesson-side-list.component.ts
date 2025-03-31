import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseService } from '../../service/course.service';
import { Lesson } from '../../models/Lesson';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-lesson-side-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-lesson-side-list.component.html',
  styleUrl: './student-lesson-side-list.component.scss'
})
export class StudentLessonSideListComponent implements OnInit {
  protected lessons: Lesson[] = [];

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .getLessons(params.get('id')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.lessons = res;
          });
      });
  }
}
