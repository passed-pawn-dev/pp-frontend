import { Component, Input, OnInit, signal } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { RouterLink } from '@angular/router';
import { ElementKind } from '../../../shared/enums/element-kind.enum';
import { Element } from '../../../coach/models/Element';

export enum LessonStatus {
  Complete = 'Complete',
  InProgress = 'InProgress',
  UnTouched = 'Untouched'
}

@Component({
  selector: 'app-student-lesson',
  imports: [RouterLink],
  templateUrl: './student-lesson.component.html',
  styleUrl: './student-lesson.component.scss'
})
export class StudentLessonComponent implements OnInit {
  public showElements: boolean = false;

  // Change to lesson object with list of all elemenets
  @Input() public lesson!: Lesson;
  @Input() public index!: number;
  @Input() public first!: boolean;
  @Input() public last!: boolean;
  @Input() public complete!: LessonStatus;

  public progress: number = 5;
  public all: number = 8;

  public toggleElements(): void {
    this.showElements = !this.showElements;
  }
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
}
