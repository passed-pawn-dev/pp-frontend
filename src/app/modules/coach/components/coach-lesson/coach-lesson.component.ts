import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../../student/models/Lesson';
import { LessonDetails } from '../../models/LessonDetails';

@Component({
  selector: 'app-coach-lesson',
  imports: [RouterLink],
  templateUrl: './coach-lesson.component.html',
  styleUrl: './coach-lesson.component.scss'
})
export class CoachLessonComponent {
  public showElements: boolean = false;

  public showAddElementOptions: boolean = false;

  // Change to lesson object with list of all elemenets
  @Input() public lesson!: LessonDetails;
  @Input() public index!: number;
  @Input() public first!: boolean;
  @Input() public last!: boolean;

  @Output() public deleteLessonEvent = new EventEmitter<string>();

  public progress: number = 5;
  public all: number = 8;

  public toggleElements(): void {
    this.showElements = !this.showElements;
  }

  public toggleAddOperations(): void {
    this.showAddElementOptions = !this.showAddElementOptions;
  }

  public deleteLesson(): void {
    this.deleteLessonEvent.emit(this.lesson.id);
  }
}
