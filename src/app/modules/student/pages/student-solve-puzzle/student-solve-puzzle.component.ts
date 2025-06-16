import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewMode } from '../../../shared/enums/preview-mode.enum';
import { PuzzleChessboardComponent } from '../../../shared/components/puzzle-chessboard/puzzle-chessboard.component';
import { Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-student-solve-puzzle',
  standalone: true,
  imports: [PuzzleChessboardComponent, DialogModule],
  templateUrl: './student-solve-puzzle.component.html',
  styleUrl: './student-solve-puzzle.component.scss'
})
export class StudentSolvePuzzleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  protected fen: string = '';
  protected solution: string = '';
  protected PreviewMode = PreviewMode;
  protected title: string = '';
  protected description: string = '';
  protected expectedMoves: string[] = [];

  protected solutionArray = computed(() => this.solution.split(','));

  protected solvedMessage: boolean = false;

  public ngOnInit(): void {
    const puzzle = this.route.snapshot.data['puzzle'];
    this.fen = puzzle.fen;
    this.solution = puzzle.solution;
    this.title = puzzle.title;
    this.description = puzzle.description;
  }

  protected back(): void {
    this.location.back();
  }

  protected showSolvedMessage(): void {
    this.solvedMessage = true;
  }

  protected hideSolvedMessage(): void {
    this.solvedMessage = false;
  }

  protected reset(): void {
    const puzzle = this.route.snapshot.data['puzzle'];
    this.fen = puzzle.fen;
    this.solution = puzzle.solution;
  }
}
