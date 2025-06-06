import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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
import { TSelectedSquare } from '../../models/chessboard-view-model.model';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list.component';
import { FenConverter } from '../../../../chess-logic/FenConverter';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import validateFEN from 'fen-validator';
import { PreviewMode } from '../../enums/preview-mode.enum';
import { cloneDeep } from 'lodash';
import { DialogModule } from 'primeng/dialog';
import { PromotionDialogComponent } from '../promotion-dialog/promotion-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-puzzle-chessboard',
  standalone: true,
  imports: [
    CommonModule,
    MoveListComponent,
    InputTextModule,
    FormsModule,
    DialogModule
  ],
  providers: [DialogService],
  templateUrl: './puzzle-chessboard.component.html',
  styleUrl: './puzzle-chessboard.component.scss'
})
export class PuzzleChessboardComponent implements OnInit {
  @Input({ required: true }) public startingFen!: string;
  // TODO - replace with enum
  @Input({ required: true }) public previewMode!: PreviewMode;
  @Input({ required: false }) public expectedMoves: string[] | null = null;
  @Output() public savePuzzle = new EventEmitter<any>();

  private dialogService: DialogService = inject(DialogService);

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
  protected initialFen: string = this.startingFen;

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

  protected setPosition: boolean = false;
  protected setSequence: boolean = false;

  protected FenConverter = FenConverter;

  protected updateBoard(
    currentSquare: string,
    targetSquare: string,
    promotedPiece: FenChar | null
  ): void {
    const currentGameState = cloneDeep(this.chessboard.gameState);
    this.chessboard.move(currentSquare, targetSquare, promotedPiece);
    this.chessboardView = this.chessboard.chessboardView;
    this.checkState = this.chessboard.checkState;
    this.lastMove = this.chessboard.lastMove;
    this.unmarkingPreviouslySelectedAndSafeSquares();

    if (this.expectedMoves) {
      const moveList = this.moveList.flatMap((move) => move);
      if (moveList[moveList.length - 1] === this.expectedMoves[moveList.length - 1]) {
        this.expectedMoves = this.expectedMoves.slice(moveList.length);
      } else {
        this.loading = true;
        setTimeout(() => {
          this.chessboard.setBoard(currentGameState);
          this.chessboardView = this.chessboard.chessboardView;
          this.loading = false;
        }, 1000);
      }
    }
    this.gameHistoryPointer++;
  }

  public promotePiece(piece: FenChar): void {
    if (!this.promotionCoords || !this.selectedSquare.piece) return;
    this.promotedPiece = piece;

    this.updateBoard(
      this.selectedSquare.square,
      ChessBoard.coordsToSquare(this.promotionCoords),
      this.promotedPiece
    );
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

  public ngOnInit(): void {
    this.chessboardView = this.chessboard.chessboardView;
    const [
      _position,
      activeColor,
      _castling,
      _enPassantSquare,
      _halfMoveClock,
      _fullMoveNumber
    ] = this.startingFen.split(' ');
    const boardFromFen = FenConverter.convertFenToBoard(this.startingFen);
    this.chessboard.setBoard({
      board: boardFromFen,
      playerToMove: activeColor === 'w' ? Color.White : Color.Black,
      lastMove: undefined
    });
    this.chessboardView = this.chessboard.chessboardView;

    this.initialFen = this.startingFen;
  }

  protected fenValid(): boolean {
    return validateFEN(this.fen);
  }

  protected setBoardFromFen(): void {
    if (validateFEN(this.fen)) {
      const boardFromFen = FenConverter.convertFenToBoard(this.fen);
      const lastMove = FenConverter.createLastMoveFromFEN(this.fen);
      const playerColor = FenConverter.getPlayerColorFromFEN(this.fen);
      this.initialFen = this.fen;
      this.lastMove = lastMove;
      this.chessboard.setBoard({
        board: boardFromFen,
        playerToMove: playerColor === 'w' ? Color.White : Color.Black,
        lastMove
      });
      this.chessboardView = this.chessboard.chessboardView;
      this.checkState = this.chessboard.checkState;
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

  private placingPiece(targetSquare: string): void {
    if (!this.selectedSquare.piece) return;
    if (!this.isSquareSafeForSelectedPiece(targetSquare)) return;
    const { x: targetX, y: targetY } = ChessBoard.squareToCoords(targetSquare);

    // pawn promotion
    const isPawnSelected: boolean =
      this.selectedSquare.piece === FenChar.WhitePawn ||
      this.selectedSquare.piece === FenChar.BlackPawn;
    const isPawnOnlastRank: boolean =
      isPawnSelected && (targetX === 7 || targetX === 0);
    const shouldOpenPromotionDialog: boolean =
      !this.isPromotionActive && isPawnOnlastRank;

    if (shouldOpenPromotionDialog) {
      this.pieceSafeSquares = [];
      this.isPromotionActive = true;
      this.openPromotionDialog();
      this.promotionCoords = { x: targetX, y: targetY };
      // because now we wait for player to choose promoted piece
      return;
    }

    const { square: currentSquare } = this.selectedSquare;
    this.updateBoard(currentSquare, targetSquare, this.promotedPiece);
  }

  protected move(square: string): void {
    if (this.gameOverMessage !== undefined) return;
    if (this.showingPastPosition) return;
    this.selectingPiece(square);
    this.placingPiece(square);
  }

  private isWrongPieceSelected(piece: FenChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return (
      (isWhitePieceSelected && this.playerColor === Color.Black) ||
      (!isWhitePieceSelected && this.playerColor === Color.White)
    );
  }

  protected selectingPiece(square: string): void {
    const piece = this.chessboardView.get(square) as FenChar | null;
    if (piece === null) return;
    if (this.isWrongPieceSelected(piece)) return;

    const isSameSquareClicked: boolean =
      !!this.selectedSquare.piece && this.selectedSquare.square === square;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    if (isSameSquareClicked) return;

    this.selectedSquare = { piece, square };
    this.pieceSafeSquares = this.safeSquares.get(square) || [];
  }

  public showPreviousPosition(moveIndex: number): void {
    const { board, checkState, lastMove } = this.gameHistory[moveIndex];
    this.chessboardView = board;
    this.checkState = checkState;
    this.lastMove = lastMove;
    this.gameHistoryPointer = moveIndex;
    if (moveIndex !== this.gameHistory.length - 1) {
      this.showingPastPosition = true;
    } else {
      this.showingPastPosition = false;
    }

    if (moveIndex === 0) {
      this.displayingStartingMove = true;
    } else {
      this.displayingStartingMove = false;
    }
  }

  public setCurrentPositionAsStartingPosition(): void {
    this.initialFen = FenConverter.convertBoardToFen(
      ChessBoard.boardViewToBoard(
        this.chessboard.gameHistory[this.gameHistoryPointer].board
      ),
      this.playerColor === Color.Black ? Color.White : Color.Black,
      this.lastMove,
      0,
      0
    );

    this.chessboard.startFromMove(this.gameHistoryPointer + 1);
    this.showingPastPosition = false;
    this.displayingStartingMove = true;
    this.gameHistoryPointer = 0;
    this.setPosition = true;
  }

  protected onSavePuzzle(): void {
    const fenBoard = this.initialFen;

    const moveListString = this.moveList.flatMap((move) => move).join(',');
    this.savePuzzle.emit({ fenBoard: fenBoard, moveListString });
    this.setSequence = true;
  }

  protected openPromotionDialog(): void {
    const dialog = this.dialogService.open(PromotionDialogComponent, {
      header: 'Choose promotion piece',
      closable: true,
      modal: true,
      data: {
        playerColor: this.playerColor
      }
    });

    dialog.onClose.subscribe((piece: FenChar) => {
      this.promotePiece(piece);
    });
  }
}
