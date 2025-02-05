import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';
import { CourseReviewComponent } from '../../../shared/components/course-review/course-review.component';
import { Exercise } from '../../models/Exercise';
import { LessonDetails } from '../../models/LessonDetails';
import {Messages} from 'primeng/messages';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-coach-course-details',
  standalone: true,
  imports: [RouterLink, CourseReviewComponent],
  templateUrl: './coach-course-details.component.html',
  styleUrl: './coach-course-details.component.scss'
})
export class CoachCourseDetailsComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    description: '',
    studentNumber: 0,
    lessonNumber: 0,
    price: 0,
    reviews: []
  });

  protected lessons = signal<LessonDetails[]>([]);

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

  protected lessonCount = computed(() => new Array(this.course().lessonNumber));

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('id')!;
      this.courseService.getById(courseId).subscribe((res) => {
        this.course.set(res);
      });

      this.courseService.getDetailsById(courseId).subscribe({
        next: (res) => {
          console.log(res);
          this.lessons.set(res.lessons);
        },
        error: (_) => this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Failed to fetch details' })
      });
    });
  }

  protected navigateAddExercise(lessonNumber: string): void {
    this.router.navigate([
      `/coach/courses/${this.course().id}/lesson/${lessonNumber}/exercise/add`
    ]);
  }

  protected deleteLesson(lessonNumber: string): void {
    this.courseService.deleteLesson(lessonNumber).subscribe({
      next: (_) => this.lessons.set(this.lessons().filter(lesson => lesson.id !== lessonNumber)),
      error: (err) => console.error(err)
    });
  }

  protected getSortedExercises(exerciseList: Exercise[]): Exercise[] {
    return exerciseList.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
}
