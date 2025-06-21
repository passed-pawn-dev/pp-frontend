import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  computed,
  inject,
  signal
} from '@angular/core';
import { CourseDetails } from '../../models/course-details.model';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { StudentCourseService } from '../../services/student-course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CourseDetailsDiagram,
  CourseDetailsDiagramComponent
} from '../../../shared/components/course-details-diagram/course-details-diagram.component';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';
import { ChessTitle } from '../../../shared/enums/chess-titles.enum';
import { CourseReview } from '../../models/course-review.model';
import { StudentLessonComponent } from '../../components/student-lesson/student-lesson.component';
import { LessonStatus } from '../../enums/lesson-status.enum';
import { StudentPaymentComponent } from '../../components/payment/student-payment.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

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
    RouterLink
  ],
  providers: [DialogService],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.scss'
})
export class StudentCourseComponent implements OnInit {
  private dialogService: DialogService = inject(DialogService);
  private studentCourseService: StudentCourseService = inject(StudentCourseService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

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
    enrolledStudentsCount: 0,
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

  protected get lessonsAvailableForPreview(): number {
    return this.course().lessons.filter((lesson) => lesson.preview).length;
  }

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected coachInitials = computed(
    () =>
      (this.course().coach.name.split(' ')[0]?.[0] ?? '') +
      (this.course().coach.name.split(' ')[1]?.[0] ?? '')
  );

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
        this.studentCourseService
          .getById(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.course.set(res);
          });
        this.studentCourseService
          .getReviews(params.get('courseId')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.reviews = res;
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

  protected openBuyCourseDialog(): void {
    this.dialogService.open(StudentPaymentComponent, {
      header: `Buy course '${this.course().title}' (${this.course().price} PLN)`,
      closable: true,
      modal: true,
      inputValues: {
        courseId: this.course().id
      }
    });
  }

  protected acquireFreeCourse(): void {
    this.studentCourseService.acquireFreeCourse(this.course().id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have been granted access to this course!'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'There was a problem obtaining the course'
        });
      }
    });
  }
}
