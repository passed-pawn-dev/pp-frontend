import { Component, Input, OnInit, computed, input } from '@angular/core';
import { CourseDetails } from '../../models/CourseDetails';
import { StudentCourseReviewComponent } from '../../components/student-course-review/student-course-review.component';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [StudentCourseReviewComponent, RouterLink],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.scss'
})
export class StudentCourseComponent implements OnInit {
  protected course: CourseDetails = {
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    lessons: [],
    reviews: []
  };

  public constructor(
    private courseService: CourseService,
    private readonly route: ActivatedRoute
  ) {}

  protected formattedPrice = computed(() => `${this.course.price.toFixed(2)} PLN`);

  protected lessonCount = computed(() => this.course.lessons.length);

  protected reviewCount = computed(() => this.course.reviews.length);

  protected averageReviewScore = computed(() =>
    this.course.reviews.length == 0
      ? 0
      : this.course.reviews.reduce((acc, curr) => acc + curr.value, 0) /
        this.course.reviews.length
  );

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseService.getById(params.get('id')!).subscribe((res) => {
        this.course = res;
      });
    });
  }
}
