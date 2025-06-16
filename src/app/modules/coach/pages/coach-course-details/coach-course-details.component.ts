import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CoachCourseService } from '../../services/coach-course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseDetails } from '../../models/course-details.model';
import { Puzzle } from '../../../shared/models/puzzle.model';
import { LessonDetails } from '../../models/lesson-details.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoachLessonComponent } from '../../components/coach-lesson/coach-lesson.component';
import { DialogModule } from 'primeng/dialog';
import { CoachAddCourseThumbnailComponent } from '../../components/coach-add-course-thumbnail/coach-add-course-thumbnail.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CoachLessonFormComponent } from '../coach-lesson-form/coach-lesson-form.component';
import { NewLesson } from '../../models/new-lesson.model';

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
  private coachCourseService = inject(CoachCourseService);
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
    lessons: [],
    thumbnailUrl: null
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
            this.coachCourseService
              .deleteThumbnail(courseId)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (_) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Thumbnail deleted successfully'
                  });

                  this.course.set({ ...this.course(), thumbnailUrl: null });
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
      `/coach/courses/${this.course().id}/lesson/${lessonNumber}/puzzle/add`
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
        this.coachCourseService
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

  protected addLesson(): void {
    this.dialogService
      .open(CoachLessonFormComponent, {
        header: 'Add Lesson',
        closable: true,
        modal: true
      })
      .onClose.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lesson: NewLesson) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!lesson) return;
          this.coachCourseService
            .addLesson(this.course().id, lesson)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (newLesson: LessonDetails) => {
                this.lessons.set([...this.lessons(), newLesson]);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Lesson created successfully'
                });
              },
              error: (_) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failure',
                  detail:
                    'Lesson could not be created. Ensure lesson number is correct.'
                });
              }
            });
        }
      });
  }

  protected editLesson(lessonId: string, lesson: NewLesson, lessonIndex: number): void {
    this.dialogService
      .open(CoachLessonFormComponent, {
        header: 'Edit Lesson',
        closable: true,
        modal: true,
        data: {
          lessonId: lessonId,
          lesson: { ...lesson, lessonNumber: lessonIndex + 1 }
        }
      })
      .onClose.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lesson: NewLesson) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!lesson) return;
          this.coachCourseService
            .editLesson(lessonId, lesson)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (updatedLesson: LessonDetails) => {
                const updatedLessons: LessonDetails[] = this.lessons().map((lesson) => {
                  return lesson.id === updatedLesson.id ? updatedLesson : lesson;
                });
                this.lessons.set(updatedLessons);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Lesson updated successfully'
                });
              },
              error: (_) =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Fail',
                  detail: 'Failed to update lesson'
                })
            });
        }
      });
  }

  protected getSortedExercises(exerciseList: Puzzle[]): Puzzle[] {
    return exerciseList.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  protected openAddCourseThumbnailDialog(): void {
    this.dialogService
      .open(CoachAddCourseThumbnailComponent, {
        header: 'Add course thumbnail',
        closable: true,
        modal: true
      })
      .onClose.subscribe({
        next: (thumbnailUrl: string) => {
          this.course.set({ ...this.course(), thumbnailUrl });
        }
      });
  }
}
