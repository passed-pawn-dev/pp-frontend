import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';
import { StudentPuzzleChessboardComponent } from '../../../student/components/student-puzzle-chessboard/student-puzzle-chessboard.component';

@Component({
  selector: 'app-coach-puzzle-preview',
  imports: [StudentPuzzleChessboardComponent, DialogModule],
  templateUrl: './coach-puzzle-preview.component.html',
  styleUrl: './coach-puzzle-preview.component.scss'
})
export class CoachPuzzlePreviewComponent {
  private route = inject(ActivatedRoute);
  protected PreviewMode = PreviewMode;
  protected expectedMoves: string[] = [];
  protected puzzle = this.route.snapshot.data['puzzle'];
  protected solutionArray = computed(() => this.puzzle.solution.split(','));

  protected solvedMessage: boolean = false;

  protected back(): void {
    // this.location.back();
  }

  protected showSolvedMessage(): void {
    this.solvedMessage = true;
  }

  protected hideSolvedMessage(): void {
    this.solvedMessage = false;
  }

  protected reset(): void {
    // const puzzle = this.route.snapshot.data['exercise'];
    // this.puzzle
  }
}
