import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  computed,
  signal
} from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CourseDetailsDiagram,
  CourseDetailsDiagramComponent
} from '../../../shared/components/course-details-diagram/course-details-diagram.component';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { ChessTitle } from '../../../shared/enums/chess-titles.enum';
import { CourseReview } from '../../models/CourseReview';
import { StudentLessonComponent } from '../../components/student-lesson/student-lesson.component';
import { LessonStatus } from '../../enums/LessonStatus';
import { Dialog } from 'primeng/dialog';
import { PaymentComponent } from '../../components/payment/payment.component';
import { SseService } from '../../service/sse.service';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [
    ButtonModule,
    StarRatingComponent,
    CourseDetailsDiagramComponent,
    CourseDifficultyComponent,
    CourseReviewComponent,
    StudentLessonComponent,
    RouterLink,
    Dialog,
    PaymentComponent
  ],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.scss'
})
export class StudentCourseComponent implements OnInit {
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    releaseDate: '',
    coach: {
      id: 0,
      name: '',
      chessTitle: ChessTitle.CandidateMaster,
      createdCoursesCount: 0,
      description: '',
      pictureUrl: ''
    },
    puzzleCount: 0,
    videoCount: 0,
    quizCount: 0,
    exampleCount: 0,
    language: '',
    eloRangeStart: 0,
    eloRangeEnd: 0,
    totalVideoCount: 0,
    reviewCount: 0,
    averageScore: 0,
    thumbnailUrl: null,
    price: 0,
    studentNumber: 0,
    isBought: false,
    lessons: []
  });

  protected reviews: CourseReview[] = [];

  protected LessonStatus = LessonStatus;

  protected showCoachDetails: boolean = false;

  protected showInpactDetails: boolean = false;

  protected showLessons: boolean = false;

  protected clientSecret: string | undefined;
  protected showPaymentModal: boolean = false;
  protected courseBought: boolean = false;

  protected diagramCourseDetails: Signal<CourseDetailsDiagram[]> = computed(() => [
    { title: 'Puzzles', amount: this.course().puzzleCount },
    { title: 'Quizes', amount: this.course().quizCount },
    { title: 'Videos', amount: this.course().videoCount },
    { title: 'Examples', amount: this.course().exampleCount }
  ]);

  public constructor(
    private courseService: CourseService,
    private readonly sseService: SseService,
    private readonly route: ActivatedRoute,
    private messageService: MessageService,
    private readonly destroyRef: DestroyRef,
    private cdRef: ChangeDetectorRef
  ) {}

  protected get lessonsAvailableForPreview(): number {
    return this.course().lessons.filter((lesson) => lesson.preview).length;
  }

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected formattedDate: Signal<string> = computed(() => {
    const date: Date = new Date(this.course().releaseDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  });

  protected reviewCount = computed(() => this.reviews.length);

  protected averageReviewScore = computed(() =>
    this.reviews.length == 0
      ? 0
      : (
          this.reviews.reduce((acc, curr) => acc + curr.value, 0) / this.reviews.length
        ).toFixed(2)
  );

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .getById(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.course.set(res);
            this.cdRef.detectChanges();
          });
        this.courseService
          .getReviews(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.reviews = res;
            this.cdRef.detectChanges();
          });
      });
  }

  protected toggleCoachDetails(): void {
    this.showCoachDetails = !this.showCoachDetails;
  }

  protected toggleInpactDetails(): void {
    this.showInpactDetails = !this.showInpactDetails;
  }

  protected toggleLessons(): void {
    this.showLessons = !this.showLessons;
  }

  protected buyCourse(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .getPaymentIntent(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (clientSecret) => {
              this.clientSecret = clientSecret;
              this.showPaymentModal = true;
            },
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Course could not be bought'
              })
          });
      });
  }

  protected paymentModalClosed(): void {
    this.showPaymentModal = false;
    this.clientSecret = undefined;
  }

  protected paymentAttempted(): void {
    this.sseService.connect('/api/sse').subscribe({
      next: (_) =>
        this.messageService.add({
          severity: 'info',
          summary: 'Course has been added to list'
        })
    });
  }

  protected paymentSuccessful(): void {
    this.showPaymentModal = false;
    this.clientSecret = undefined;
    this.courseBought = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Payment successful! Course will be added to your list shortly'
    });
  }

  protected paymentFailed(details: string): void {
    this.sseService.disconnect();

    this.messageService.add({
      severity: 'error',
      summary: 'Failure',
      detail: details
    });
  }
}
