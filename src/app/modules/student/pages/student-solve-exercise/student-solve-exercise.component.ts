import { Component, computed, inject, OnInit } from '@angular/core';
import { PuzzleChessboardComponent } from '../../../shared/components/puzzle-chessboard/puzzle-chessboard.component';
import { ActivatedRoute } from '@angular/router';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';

@Component({
  selector: 'app-student-solve-exercise',
  standalone: true,
  imports: [PuzzleChessboardComponent],
  templateUrl: './student-solve-exercise.component.html',
  styleUrl: './student-solve-exercise.component.scss'
})
export class StudentSolveExerciseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected fen: string = '';
  protected solution: string = '';
  protected PreviewMode = PreviewMode;

  protected solutionArray = computed(() => this.solution.split(','));

  public ngOnInit(): void {
    const exercise = this.route.snapshot.data['exercise'];
    this.fen = exercise.fen;
    this.solution = exercise.solution;
  }
}
