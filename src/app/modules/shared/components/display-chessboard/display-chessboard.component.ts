import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Button } from 'primeng/button';
import {
  Color,
  TCheckState,
  TChessboardView,
  TLastMove
} from '../../../../chess-logic/models';
import { pieceImagePaths } from '../../../../chess-logic/models';
import { ChessBoard } from '../../../../chess-logic/board';
import { CommonModule } from '@angular/common';
import { FenConverter } from '../../../../chess-logic/FenConverter';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PreviewMode } from '../../enums/preview-mode.enum';
import { Arrow } from '../../models/Arrow';
import { Severity } from '../../enums/severities.enum';
import { ChessboardArrowsDirective } from '../../directives/chessboard-arrows.directive';
import { ChessboardHighlightsDirective } from '../../directives/chessboard-highlights.directive';

@Component({
  selector: 'app-display-chessboard',
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ChessboardArrowsDirective,
    ChessboardHighlightsDirective
  ],
  templateUrl: './display-chessboard.component.html',
  styleUrl: './display-chessboard.component.scss'
})
export class DisplayChessboardComponent implements OnInit, OnChanges {
  @Input({ required: true }) public startingFen!: string;
  @Input() public arrows: Arrow[] = [];
  @Input() public highlights: Map<number, Severity> = new Map([]);
  @Input() public lastMove!: TLastMove | undefined;

  protected PreviewMode = PreviewMode;
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  private chessboard = new ChessBoard();
  protected chessboardView: TChessboardView = this.chessboard.chessboardView;
  private checkState: TCheckState = this.chessboard.checkState;
  protected loading = false;
  public fen: string = '';

  protected get playerColor(): Color {
    return this.chessboard.playerColor;
  }

  protected pieceImagePaths = pieceImagePaths;

  public ngOnChanges(changes: SimpleChanges): void {
    const boardFromFen = FenConverter.convertFenToBoard(this.startingFen);
    this.chessboard.setBoard({
      board: boardFromFen,
      playerToMove: Color.White,
      lastMove: this.lastMove
    });
    this.checkState = this.chessboard.checkState;
    this.chessboardView = this.chessboard.chessboardView;
  }

  public ngOnInit(): void {
    this.chessboardView = this.chessboard.chessboardView;
    const [
      position,
      activeColor,
      castling,
      enPassantSquare,
      halfMoveClock,
      fullMoveNumber
    ] = this.startingFen.split(' ');
    const boardFromFen = FenConverter.convertFenToBoard(this.startingFen);
    this.chessboard.setBoard({
      board: boardFromFen,
      playerToMove: activeColor === 'w' ? Color.White : Color.Black,
      lastMove: this.lastMove
    });
    this.chessboardView = this.chessboard.chessboardView;
  }

  public isSquareLastMove(square: string): boolean {
    if (!this.lastMove) return false;
    const { prevSquare, currentSquare } = this.lastMove;
    return square === prevSquare || square === currentSquare;
  }

  public isSquareChecked(square: string): boolean {
    return this.checkState.isInCheck && this.checkState.square === square;
  }
}
