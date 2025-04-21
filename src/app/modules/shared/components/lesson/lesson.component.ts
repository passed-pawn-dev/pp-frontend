import { Component, Input } from '@angular/core';
import { Lesson } from '../../../student/models/Lesson';

export enum LessonStatus {
  Complete = 'Complete',
  InProgress = 'InProgress',
  UnTouched = 'Untouched'
}

@Component({
  selector: 'app-lesson',
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
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
    console.log(this.lesson);
  }
}
