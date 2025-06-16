import { Component, DestroyRef, inject, AfterViewInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoachCourseService } from '../services/coach-course.service';
import { PreviewMode } from '../../shared/enums/preview-mode.enum';
import { PuzzleData } from '../../shared/models/puzzle-data.model';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { CoachPuzzleChessboardEditorComponent } from '../components/coach-puzzle-chessboard-editor/coach-puzzle-chessboard-editor.component';
import { ValidationErrorsComponent } from '../../shared/components/validation-errors/validation-errors.component';
import { Puzzle } from '../../shared/models/puzzle.model';

@Component({
  selector: 'app-coach-puzzle-edit',
  imports: [
    CoachPuzzleChessboardEditorComponent,
    ReactiveFormsModule,
    InputTextModule,
    Textarea,
    ValidationErrorsComponent,
    RouterLink
  ],
  templateUrl: './coach-puzzle-edit.component.html',
  styleUrl: './coach-puzzle-edit.component.scss'
})
export class CoachPuzzleEditComponent implements AfterViewInit {
  @ViewChild(CoachPuzzleChessboardEditorComponent)
  private puzzleChessboardComponent!: CoachPuzzleChessboardEditorComponent;
  private route = inject(ActivatedRoute);
  private coachCourseService = inject(CoachCourseService);
  private nnfb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected puzzle: Puzzle = this.route.snapshot.data['puzzle'];
  protected PreviewMode = PreviewMode;

  protected exerciseForm = this.nnfb.group({
    title: [this.puzzle.title, [Validators.required, Validators.maxLength(50)]],
    description: [
      this.puzzle.description,
      [Validators.required, Validators.maxLength(300)]
    ]
  });

  public ngAfterViewInit(): void {
    const expectedMovesInAlgebraicNotation = this.puzzle.solution.split(',');
    this.puzzleChessboardComponent.playMovesFromAlgebraicNotation(
      expectedMovesInAlgebraicNotation
    );
  }

  protected savePuzzle(puzzleData: PuzzleData): void {
    if (!this.exerciseForm.valid) {
      this.exerciseForm.controls.description.markAsDirty();
      this.exerciseForm.controls.description.markAsTouched();
      this.exerciseForm.controls.title.markAsDirty();
      this.exerciseForm.controls.title.markAsTouched();

      return;
    }

    this.coachCourseService
      .editPuzzle(
        this.puzzle.id,
        this.exerciseForm.value.title!,
        this.exerciseForm.value.description!,
        puzzleData.fenBoard,
        puzzleData.moveListString,
        this.puzzle.order
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Puzzle edited successfully'
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: 'Puzzle could not be edited'
          });
        }
      });
  }
}
