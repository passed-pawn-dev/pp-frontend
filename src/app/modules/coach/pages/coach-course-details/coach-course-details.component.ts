import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/CourseDetails';
import { Puzzle } from '../../models/Puzzle';
import { LessonDetails } from '../../models/LessonDetails';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoachLessonComponent } from '../../components/coach-lesson/coach-lesson.component';
import { DialogModule } from 'primeng/dialog';
import { CoachAddCourseThumbnailComponent } from '../../components/coach-add-course-thumbnail/coach-add-course-thumbnail.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-coach-course-details',
  standalone: true,
  imports: [RouterLink, CoachLessonComponent, DialogModule],
  providers: [DialogService],
  templateUrl: './coach-course-details.component.html',
  styleUrl: './coach-course-details.component.scss'
})
export class CoachCourseDetailsComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private dialogService: DialogService = inject(DialogService);

  protected course = signal<CourseDetails>({
    id: '',
    title: '',
    averageScore: 0,
    description: '',
    enrolledStudentsCount: 0,
    price: 0,
    reviews: [],
    lessons: []
  });

  protected lessons = signal<LessonDetails[]>([]);

  protected formattedPrice = computed(() => `${this.course().price.toFixed(2)} PLN`);

  protected reviewCount = computed(() => this.course().reviews.length || 0);

  protected thumbnailFormVisible: boolean = false;

  protected averageReviewScore = computed(() =>
    this.course().reviews.length == 0
      ? 0
      : this.course().reviews.reduce((acc, curr) => acc + curr.value, 0) /
        this.course().reviews.length
  );

  protected lessonCount = computed(() => new Array(this.course().lessons.length));

  public ngOnInit(): void {
    const course = this.route.snapshot.data['course'];
    this.course.set(course);
    this.lessons.set(course.lessons);
  }

  protected deleteThumbnail(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this thumbnail?',
      header: 'Confirm',
      accept: () => {
        this.route.paramMap
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((params) => {
            const courseId = params.get('courseId')!;
            this.courseService
              .deleteThumbnail(courseId)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (_) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Thumbnail deleted successfully'
                  });
                },
                error: (_) =>
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Fail',
                    detail: 'Failed to delete thumbnail'
                  })
              });
          });
      },
      reject: () => {}
    });
  }

  protected navigateAddExercise(lessonNumber: string): void {
    this.router.navigate([
      `/coach/courses/${this.course().id}/lesson/${lessonNumber}/exercise/add`
    ]);
  }

  protected navigateAddQuiz(lessonNumber: string): void {
    this.router.navigate([
      `/coach/courses/${this.course().id}/lesson/${lessonNumber}/quiz/add`
    ]);
  }

  protected deleteLesson(lessonNumber: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this lesson?',
      header: 'Confirm',
      accept: () => {
        this.courseService
          .deleteLesson(lessonNumber)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) => {
              this.lessons.set(
                this.lessons().filter((lesson) => lesson.id !== lessonNumber)
              );

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Lesson deleted successfully'
              });
            },
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Failed to delete lesson'
              })
          });
      },
      reject: () => {}
    });
  }

  protected getSortedExercises(exerciseList: Puzzle[]): Puzzle[] {
    return exerciseList.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  protected openAddCourseThumbnailDialog(): void {
    this.dialogService.open(CoachAddCourseThumbnailComponent, {
      header: 'Add course thumbnail',
      closable: true,
      modal: true
    });
  }
}
