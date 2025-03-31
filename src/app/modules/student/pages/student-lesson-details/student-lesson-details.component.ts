import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { LessonDetails } from '../../models/LessonDetails';
import { LessonService } from '../../service/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-lesson-details',
  standalone: true,
  imports: [],
  templateUrl: './student-lesson-details.component.html',
  styleUrl: './student-lesson-details.component.scss'
})
export class StudentLessonDetailsComponent implements OnInit {
  protected lesson = signal<LessonDetails>({
    id: '',
    lessonNumber: 0,
    video: {
      id: '',
      title: '',
      description: '',
      url: ''
    },
    exercises: [],
    examples: []
  });

  public constructor(
    private lessonService: LessonService,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.lessonService
          .getById(params.get('id')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.lesson.set(res);
          });
      });
  }
}
