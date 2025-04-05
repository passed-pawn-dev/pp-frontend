import {
  Component,
  DestroyRef,
  Input,
  OnInit,
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

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [
    ButtonModule,
    StarRatingComponent,
    CourseDetailsDiagramComponent,
    CourseDifficultyComponent,
    CourseReviewComponent
  ],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.scss'
})
export class StudentCourseComponent implements OnInit {
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    price: 0,
    lessonNumber: 0,
    studentNumber: 0,
    reviews: []
  });

  protected showCoachDetails: boolean = false;

  protected showInpactDetails: boolean = false;

  protected diagramCourseDetails: CourseDetailsDiagram[] = [
    { title: 'Puzzles', amount: 16 },
    { title: 'Quizes', amount: 1 },
    { title: 'Video', amount: 9 },
    { title: 'Examples', amount: 10 }
  ];

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private messageService: MessageService,
    private readonly destroyRef: DestroyRef
  ) {}

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected reviewCount = computed(() => this.course().reviews.length);

  protected averageReviewScore = computed(() =>
    this.course().reviews.length == 0
      ? 0
      : (
          this.course().reviews.reduce((acc, curr) => acc + curr.value, 0) /
          this.course().reviews.length
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
