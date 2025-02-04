import { Component, OnInit, computed, signal } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';

@Component({
  selector: 'app-coach-course-details',
  standalone: true,
  imports: [RouterLink, CourseReviewComponent],
  templateUrl: './coach-course-details.component.html',
  styleUrl: './coach-course-details.component.scss'
})
export class CoachCourseDetailsComponent implements OnInit {
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    studentNumber: 0,
    lessonNumber: 0,
    price: 0,
    reviews: []
  });

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute
  ) {}

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected reviewCount = computed(() => this.course().reviews.length);

  protected averageReviewScore = computed(() =>
    this.course().reviews.length == 0
      ? 0
      : this.course().reviews.reduce((acc, curr) => acc + curr.value, 0) /
        this.course().reviews.length
  );

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.getById(params.get('id')!).subscribe((res) => {
        console.log(res);
        this.course.set(res);
      });
    });
  }
}
