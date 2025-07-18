import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentCourseService } from '../../services/student-course.service';
import { Lesson } from '../../models/lesson.model';
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
    private studentCourseService: StudentCourseService,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.studentCourseService
          .getLessons(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.lessons = res;
          });
      });
  }
}
