import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PuzzleChessboardComponent } from '../../../shared/components/puzzle-chessboard/puzzle-chessboard.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PuzzleData } from '../../../shared/models/puzzleData';
import { CourseService } from '../../service/course.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coach-add-exercise',
  standalone: true,
  imports: [
    PuzzleChessboardComponent,
    ReactiveFormsModule,
    InputTextModule,
    Textarea,
    ValidationErrorsComponent
  ],
  templateUrl: './coach-add-exercise.component.html',
  styleUrl: './coach-add-exercise.component.scss'
})
export class CoachAddExerciseComponent implements OnInit {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected lessonId: string | null = null;
  protected PreviewMode = PreviewMode;

  protected exerciseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(300)]]
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.lessonId = params.get('lessonId')!;
      });
  }

  protected back(): void {
    this.location.back();
  }

  protected savePuzzle(puzzleData: PuzzleData): void {
    if (this.lessonId === null || !this.exerciseForm.valid) {
      this.exerciseForm.controls.description.markAsDirty();
      this.exerciseForm.controls.description.markAsTouched();
      this.exerciseForm.controls.title.markAsDirty();
      this.exerciseForm.controls.title.markAsTouched();

      return;
    }

    this.courseService
      .addExercise(
        this.lessonId,
        this.exerciseForm.value.title!,
        this.exerciseForm.value.description!,
        puzzleData.fenBoard,
        puzzleData.moveListString
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Puzzle created successfully'
          });
          this.back();
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Puzzle could not be created'
          });
        }
      });
  }
}
