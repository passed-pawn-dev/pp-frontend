import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LessonDetails } from '../../models/lesson-details.model';
import { Element } from '../../models/element.model';
import { ElementKind } from '../../../shared/enums/element-kind.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoachCourseService } from '../../services/coach-course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from 'primeng/dynamicdialog';
import { NewLesson } from '../../models/new-lesson.model';
import { CoachAddVideoDialogComponent } from '../coach-add-video-dialog/coach-add-video-dialog.component';

@Component({
  selector: 'app-coach-lesson',
  imports: [RouterLink],
  providers: [DialogService],
  templateUrl: './coach-lesson.component.html',
  styleUrl: './coach-lesson.component.scss'
})
export class CoachLessonComponent implements OnInit {
  private coachCourseService: CoachCourseService = inject(CoachCourseService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private dialogService: DialogService = inject(DialogService);

  protected showElements: boolean = false;

  protected showAddElementOptions: boolean = false;

  // Change to lesson object with list of all elemenets
  @Input({ required: true }) public lesson!: LessonDetails;
  @Input({ required: true }) public index!: number;
  @Input({ required: true }) public first!: boolean;
  @Input({ required: true }) public last!: boolean;

  @Output() public deleteLessonEvent = new EventEmitter<string>();
  @Output() public editLessonEvent = new EventEmitter<NewLesson>();

  protected progress: number = 5;
  protected all: number = 8;
  protected elements = signal<Element[]>([]);

  protected kindToIcon: Map<ElementKind, string> = new Map([
    [ElementKind.Puzzle, 'icons/puzzle.png'],
    [ElementKind.Quiz, 'icons/quiz.png'],
    [ElementKind.Example, 'icons/example.png'],
    [ElementKind.Video, 'icons/video.png']
  ]);

  public ngOnInit(): void {
    this.elements.set(this.combineElementArrays());
  }

  private combineElementArrays(): Element[] {
    return [
      ...this.lesson.quizzes.map((el) => {
        return {
          ...el,
          kind: ElementKind.Quiz
        } as Element;
      }),
      ...this.lesson.examples.map((el) => {
        return {
          ...el,
          kind: ElementKind.Example
        } as Element;
      }),
      ...this.lesson.puzzles.map((el) => {
        return {
          ...el,
          kind: ElementKind.Puzzle
        } as Element;
      }),
      ...this.lesson.videos.map((el) => {
        return {
          ...el,
          kind: ElementKind.Video
        } as Element;
      })
    ].sort((a, b) => a.order - b.order);
  }

  protected toggleElements(): void {
    this.showElements = !this.showElements;
  }

  protected toggleAddOperations(): void {
    this.showAddElementOptions = !this.showAddElementOptions;
  }

  protected deleteLesson(_: Event): void {
    this.deleteLessonEvent.emit(this.lesson.id);
  }

  protected editLesson(): void {
    this.editLessonEvent.emit({
      title: this.lesson.title,
      lessonNumber: this.lesson.lessonNumber!,
      preview: this.lesson.preview
    });
  }

  protected deleteElement(e: Event, elementId: string, elementKind: ElementKind): void {
    e.preventDefault();
    e.stopPropagation();

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this element?',
      header: 'Confirm',
      accept: () => {
        this.coachCourseService
          .deleteElement(elementId, elementKind)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (_) => {
              this.elements.set(this.elements().filter((el) => el.id !== elementId));

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Element deleted successfully'
              });
            },
            error: (_) =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete element'
              })
          });
      },
      reject: () => {}
    });
  }

  protected openAddVideoDialog(): void {
    this.dialogService.open(CoachAddVideoDialogComponent, {
      header: 'Add video',
      closable: true,
      modal: true,
      inputValues: {
        lessonId: this.lesson.id
      }
    });
  }
}
