import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Button } from 'primeng/button';
import {
  Color,
  FenChar,
  TCheckState,
  TChessboardView,
  TCoords,
  TGameHistory,
  TLastMove,
  TMoveList,
  TSafeSquares
} from '../../../../chess-logic/models';
import { pieceImagePaths } from '../../../../chess-logic/models';
import { ChessBoard } from '../../../../chess-logic/board';
import { TSelectedSquare } from '../../models/chessboardViewModels';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list.component';
import { FenConverter } from '../../../../chess-logic/FenConverter';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import validateFEN from 'fen-validator';
import { PreviewMode } from '../../enums/preview-mode.enum';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-display-chessboard',
  imports: [CommonModule, InputTextModule, FormsModule],
  templateUrl: './display-chessboard.component.html',
  styleUrl: './display-chessboard.component.scss'
})
export class DisplayChessboardComponent implements OnInit, OnChanges {
  @Input({ required: true }) public startingFen!: string;

  protected PreviewMode = PreviewMode;
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  protected Color = Color;
  private chessboard = new ChessBoard();
  protected chessboardView: TChessboardView = this.chessboard.chessboardView;
  private selectedSquare: TSelectedSquare = { piece: null };
  private pieceSafeSquares: string[] = [];
  private lastMove: TLastMove | undefined = this.chessboard.lastMove;
  private checkState: TCheckState = this.chessboard.checkState;
  protected loading = false;
  public fen: string = '';

  public get moveList(): TMoveList {
    return this.chessboard.moveList;
  }
  public get gameHistory(): TGameHistory {
    return this.chessboard.gameHistory;
  }
  public gameHistoryPointer: number = 0;

  // promotion properties
  public isPromotionActive: boolean = false;
  private promotionCoords: TCoords | null = null;
  private promotedPiece: FenChar | null = null;
  protected showingPastPosition: boolean = false;
  protected displayingStartingMove: boolean = true;

  public promotionPieces(): FenChar[] {
    return this.playerColor === Color.White
      ? [
          FenChar.WhiteKnight,
          FenChar.WhiteBishop,
          FenChar.WhiteRook,
          FenChar.WhiteQueen
        ]
      : [
          FenChar.BlackKnight,
          FenChar.BlackBishop,
          FenChar.BlackRook,
          FenChar.BlackQueen
        ];
  }

  public closePawnPromotionDialog(): void {
    this.unmarkingPreviouslySelectedAndSafeSquares();
  }

  protected get gameOverMessage(): string | undefined {
    return this.chessboard.gameOverMessage;
  }

  protected get playerColor(): Color {
    return this.chessboard.playerColor;
  }

  protected get safeSquares(): TSafeSquares {
    return this.chessboard.safeSquares;
  }

  protected pieceImagePaths = pieceImagePaths;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['startingFen']) {
      const boardFromFen = FenConverter.convertFenToBoard(this.startingFen);
      this.chessboard.setBoard({
        board: boardFromFen,
        playerToMove: Color.White,
        lastMove: undefined
      });
      this.chessboardView = this.chessboard.chessboardView;
    }
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
      lastMove: undefined
    });
    this.chessboardView = this.chessboard.chessboardView;
  }

  protected fenValid(): boolean {
    return validateFEN(this.fen);
  }

  protected setBoardFromFen(): void {
    if (validateFEN(this.fen)) {
      const boardFromFen = FenConverter.convertFenToBoard(this.fen);
      const lastMove = FenConverter.createLastMoveFromFEN(this.fen);
      this.lastMove = lastMove;
      this.chessboard.setBoard({
        board: boardFromFen,
        playerToMove: Color.White,
        lastMove
      });
      this.chessboardView = this.chessboard.chessboardView;
    }
  }

  public isSquarePromotionSquare(square: string): boolean {
    const { x, y } = ChessBoard.squareToCoords(square);
    if (!this.promotionCoords) return false;
    return this.promotionCoords.x === x && this.promotionCoords.y === y;
  }

  public isSquareSelected(square: string): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.square === square;
  }

  public isSquareSafeForSelectedPiece(targetSquare: string): boolean {
    return this.pieceSafeSquares.some((square) => square === targetSquare);
  }

  public isSquareLastMove(square: string): boolean {
    if (!this.lastMove) return false;
    const { prevSquare, currentSquare } = this.lastMove;
    return square === prevSquare || square === currentSquare;
  }

  public isSquareChecked(square: string): boolean {
    return this.checkState.isInCheck && this.checkState.square === square;
  }

  private unmarkingPreviouslySelectedAndSafeSquares(): void {
    this.selectedSquare = { piece: null };
    this.pieceSafeSquares = [];

    if (this.isPromotionActive) {
      this.isPromotionActive = false;
      this.promotedPiece = null;
      this.promotionCoords = null;
    }
  }

  protected reverseChessboard(): void {
    this.chessboard.reverseChessboard();
    this.chessboardView = this.chessboard.chessboardView;
    this.pieceSafeSquares = [];
    this.selectedSquare = { piece: null };
  }
}
