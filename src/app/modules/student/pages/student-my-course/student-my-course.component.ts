import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { MyCourseDetails } from '../../models/MyCourseDetails';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Exercise } from '../../models/Exercise';
import { ButtonModule } from 'primeng/button';
import { Quiz } from '../../models/Quiz';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { DialogModule } from 'primeng/dialog';
import { StudentLessonComponent } from '../../components/student-lesson/student-lesson.component';
import { LessonStatus } from '../../enums/LessonStatus';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [
    ButtonModule,
    StudentLessonComponent,
    StudentCourseReviewFormComponent,
    DialogModule
  ],
  providers: [],
  templateUrl: './student-my-course.component.html',
  styleUrl: './student-my-course.component.scss'
})
export class StudentMyCourseComponent implements OnInit {
  protected course = signal<MyCourseDetails>({
    id: '',
    title: '',
    description: '',
    coachName: '',
    thumbnail: '',
    lessons: []
  });

  protected quiz = signal<Quiz>({
    id: '1',
    title: 'quiz',
    order: 1
  });

  protected LessonStatus = LessonStatus;

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
    private readonly destroyRef: DestroyRef
  ) {}

  public showElements: boolean = true;

  protected reviewFormVisible: boolean = false;

  public toggleElements(): void {
    this.showElements = !this.showElements;
  }

  public turnOn: boolean = false;

  protected showReviewForm(): void {
    this.reviewFormVisible = true;
  }

  protected hideReviewForm(): void {
    this.reviewFormVisible = false;
  }

  public toggleSwitch(): void {
    this.turnOn = !this.turnOn;
  }

  public ngOnInit(): void {
    const course = this.route.snapshot.data['course'];
    this.course.set(course);
  }

  protected getSortedExercises(exerciseList: Exercise[]): Exercise[] {
    return exerciseList.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  protected signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to sign out from this course?',
      header: 'Confirm',
      accept: () => {
        this.route.paramMap
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((params) => {
            this.courseService
              .signOut(params.get('id')!)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (_) =>
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Signed out successfully'
                  }),
                error: (_) =>
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Failure',
                    detail: 'Could not sign out'
                  })
              });
          });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      reject: () => {}
    });
  }
}
