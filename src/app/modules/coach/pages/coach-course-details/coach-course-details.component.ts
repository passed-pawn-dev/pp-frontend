import { Component, OnInit, computed, signal } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';

@Component({
  selector: 'app-coach-course-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-course-details.component.html',
  styleUrl: './coach-course-details.component.scss'
})
export class CoachCourseDetailsComponent implements OnInit {
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    lessons: [],
    reviews: []
  });

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute
  ) {}

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected lessonCount = computed(() => this.course().lessons.length);

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
        this.course.set(res);
      });
    });
  }
}
