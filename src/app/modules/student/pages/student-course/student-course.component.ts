import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  Signal,
  computed,
  input,
  signal
} from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
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

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [
    ButtonModule,
    StarRatingComponent,
    CourseDetailsDiagramComponent,
    CourseDifficultyComponent,
    CourseReviewComponent,
    RouterLink
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
    pictureUrl: null,
    price: 0,
    studentNumber: 0,
    isBought: false
  });

  protected reviews: CourseReview[] = [];

  protected showCoachDetails: boolean = false;

  protected showInpactDetails: boolean = false;

  protected diagramCourseDetails: Signal<CourseDetailsDiagram[]> = computed(() => [
    { title: 'Puzzles', amount: this.course().puzzleCount },
    { title: 'Quizes', amount: this.course().quizCount },
    { title: 'Videos', amount: this.course().videoCount },
    { title: 'Examples', amount: this.course().exampleCount }
  ]);

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private messageService: MessageService,
    private readonly destroyRef: DestroyRef
  ) {}

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
          .getById(params.get('id')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.course.set(res);
          });
      });
  }

  protected toggleCoachDetails(): void {
    this.showCoachDetails = !this.showCoachDetails;
  }

  protected toggleInpactDetails(): void {
    this.showInpactDetails = !this.showInpactDetails;
  }

  protected buyCourse(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.courseService
          .buy(params.get('id')!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) =>
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Course bought successfully'
              }),
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: 'Course could not be bought'
              })
          });
      });
  }
}
