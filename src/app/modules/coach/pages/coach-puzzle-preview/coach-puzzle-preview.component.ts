import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';
import { PuzzleChessboardComponent } from '../../../shared/components/puzzle-chessboard/puzzle-chessboard.component';

@Component({
  selector: 'app-coach-puzzle-preview',
  imports: [PuzzleChessboardComponent, DialogModule, RouterLink],
  templateUrl: './coach-puzzle-preview.component.html',
  styleUrl: './coach-puzzle-preview.component.scss'
})
export class CoachPuzzlePreviewComponent {
  private route = inject(ActivatedRoute);
  protected PreviewMode = PreviewMode;
  protected puzzle = this.route.snapshot.data['puzzle'];
  protected solutionArray = computed(() => this.puzzle.solution.split(','));

  protected solvedMessage: boolean = false;

  protected showSolvedMessage(): void {
    this.solvedMessage = true;
  }

  protected hideSolvedMessage(): void {
    this.solvedMessage = false;
  }
}
