import { Component, inject, OnInit } from '@angular/core';
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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';

@Component({
  selector: 'app-coach-add-exercise',
  standalone: true,
  imports: [
    PuzzleChessboardComponent,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
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
  protected lessonId: string | null = null;
  protected PreviewMode = PreviewMode;

  protected exerciseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(300)]]
  });

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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
      .subscribe({
        next: (_) => {
          this.back();
        },
        error: (err) => console.error(err)
      });
  }
}
