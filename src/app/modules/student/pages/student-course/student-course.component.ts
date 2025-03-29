import { Component, Input, OnInit, computed, input, signal } from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { CourseDetailsDiagramComponent } from '../../../shared/components/course-details-diagram/course-details-diagram.component';
import { CourseDifficultyComponent } from '../../../shared/components/course-difficulty/course-difficulty.component';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [
    CourseReviewComponent,
    RouterLink,
    ButtonModule,
    StarRatingComponent,
    CourseDetailsDiagramComponent,
    CourseDifficultyComponent
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

  protected showInsideDetails: boolean = true;

  protected showInpactDetails: boolean = false;

  protected courseDetails: [number, string][] = [
    [7, 'Puzzeles'],
    [7, 'Quizes'],
    [5, 'Video'],
    [7, 'Examples'],
    [100, 'Articles']
  ];

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} $`);

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
    this.route.paramMap.subscribe((params) => {
      this.courseService.getById(params.get('id')!).subscribe((res) => {
        this.course.set(res);
      });
    });
  }

  protected toggleCoachDetails(): void {
    this.showCoachDetails = !this.showCoachDetails;
  }

  protected toggleInsideDetails(): void {
    this.showInsideDetails = !this.showInsideDetails;
  }

  protected toggleInpactDetails(): void {
    this.showInpactDetails = !this.showInpactDetails;
  }

  protected buyCourse(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.buy(params.get('id')!).subscribe({
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
