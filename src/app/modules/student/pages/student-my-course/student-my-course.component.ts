import { Component, DestroyRef, OnInit, computed, signal } from '@angular/core';
import { MyCourseDetails } from '../../models/my-course-details.model';
import { StudentCourseReviewFormComponent } from '../../components/student-course-review-form/student-course-review-form.component';
import { StudentCourseService } from '../../services/student-course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Quiz } from '../../models/quiz.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
import { StudentLessonComponent } from '../../components/student-lesson/student-lesson.component';
import { LessonStatus } from '../../enums/lesson-status.enum';
import { CourseReview } from '../../models/course-review.model';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-student-my-course',
  standalone: true,
  imports: [
    ButtonModule,
    StudentLessonComponent,
    StudentCourseReviewFormComponent,
    DialogModule,
    StarRatingComponent
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
    thumbnailUrl: '',
    lessons: []
  });

  protected givenReview = signal<CourseReview | null>(null);

  protected quiz = signal<Quiz>({
    id: '1',
    title: 'quiz',
    order: 1
  });

  protected shortenedReview = computed(() => {
    if (this.givenReview() && this.givenReview()!.content) {
      return this.givenReview()!.content!.length < 20
        ? this.givenReview()!.content
        : this.givenReview()!.content?.slice(0, 20) + '...';
    } else return '';
  });

  protected LessonStatus = LessonStatus;

  public constructor(
    private studentCourseService: StudentCourseService,
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
    this.givenReview.set(course.givenReview);
  }

  protected newReview(review: CourseReview): void {
    this.hideReviewForm();
    this.givenReview.set(review);
  }

  protected deleteReview(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your review?',
      header: 'Confirm',
      accept: () => {
        this.studentCourseService
          .deleteReview(this.givenReview()!.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Review deleted successfully'
              });
              this.givenReview.set(null);
            },
            error: () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Could not delete review'
              })
          });
      }
    });
  }

  protected signOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to sign out from this course?',
      header: 'Confirm',
      accept: () => {
        this.route.paramMap
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((params) => {
            this.studentCourseService
              .signOut(params.get('courseId')!)
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
      }
    });
  }
}
