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
import { Lesson } from '../../../student/models/Lesson';
import { LessonDetails } from '../../models/LessonDetails';
import { Quiz } from '../../../student/models/Quiz';
import { Video } from '../../../student/models/Video';
import { Element } from '../../models/Element';
import { ElementKind } from '../../../shared/enums/element-kind.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseService } from '../../service/course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-lesson',
  imports: [RouterLink],
  templateUrl: './coach-lesson.component.html',
  styleUrl: './coach-lesson.component.scss'
})
export class CoachLessonComponent implements OnInit {
  private courseService: CourseService = inject(CourseService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public showElements: boolean = false;

  public showAddElementOptions: boolean = false;

  // Change to lesson object with list of all elemenets
  @Input({ required: true }) public lesson!: LessonDetails;
  @Input({ required: true }) public index!: number;
  @Input({ required: true }) public first!: boolean;
  @Input({ required: true }) public last!: boolean;

  @Output() public deleteLessonEvent = new EventEmitter<string>();

  public progress: number = 5;
  public all: number = 8;
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
      ...this.lesson.examples.map((el) => {
        return {
          ...el,
          kind: ElementKind.Example
        } as Element;
      })
    ].sort((a, b) => a.order - b.order);
  }

  public toggleElements(): void {
    this.showElements = !this.showElements;
  }

  public toggleAddOperations(): void {
    this.showAddElementOptions = !this.showAddElementOptions;
  }

  public deleteLesson(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.deleteLessonEvent.emit(this.lesson.id);
  }

  public deleteElement(e: Event, elementId: string, elementKind: ElementKind): void {
    e.preventDefault();
    e.stopPropagation();

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this element?',
      header: 'Confirm',
      accept: () => {
        this.courseService
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
}
