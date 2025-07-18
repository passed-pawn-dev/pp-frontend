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
import { FenConverter } from '../../../../chess-logic/FenConverter';
import { cloneDeep } from 'lodash';
import { TSelectedSquare } from '../../models/chessboard-view-model.model';
import { PreviewMode } from '../../enums/preview-mode.enum';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PromotionDialogComponent } from '../promotion-dialog/promotion-dialog.component';

@Component({
  selector: 'app-puzzle-chessboard',
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
  @Input({ required: true }) public previewMode!: PreviewMode;
  @Input({ required: false }) public expectedMoves: string[] | null = null;
  @Output() public savePuzzle = new EventEmitter<any>();
  @Output() public solved = new EventEmitter<void>();

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
  private _expectedMoves: string[] | null = null;
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

    if (this._expectedMoves) {
      const moveList = this.moveList.flatMap((move) => move);

      if (moveList[moveList.length - 1] === this._expectedMoves[0]) {
        this._expectedMoves = this._expectedMoves.slice(1);
        if (this._expectedMoves.length === 0) {
          this.solved.emit();
          return;
        }
        this.loading = true;
        setTimeout(() => {
          this.playEnemyMove();
          this.loading = false;
        }, 500);
      } else {
        this.loading = true;
        setTimeout(() => {
          this.chessboard.setBoard(currentGameState);
          this.checkState = this.chessboard.checkState;
          this.chessboardView = this.chessboard.chessboardView;
          this.lastMove = this.chessboard.lastMove;
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
    this.setPuzzle();
  }

  public setPuzzle(): void {
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
    const lastMove = FenConverter.createLastMoveFromFEN(this.startingFen);
    this.chessboard.setBoard({
      board: boardFromFen,
      playerToMove: activeColor === 'w' ? Color.White : Color.Black,
      lastMove: lastMove
    });
    this.chessboardView = this.chessboard.chessboardView;
    this.lastMove = this.chessboard.lastMove;
    this.checkState = this.chessboard.checkState;
    this._expectedMoves = this.expectedMoves;

    this.detectAndMarkMovedPawns();

    if (activeColor === 'b') this.reverseChessboard();
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

  private playEnemyMove(): void {
    this.chessboard.safeSquares.forEach(
      (possibleSquares: string[], pieceSquare: string) => {
        possibleSquares.forEach((possibleSquare) => {
          const allPieces: (FenChar | null)[] = [...Object.values(FenChar), null];

          allPieces.forEach((promotionPiece) => {
            const currentGameState = cloneDeep(this.chessboard.gameState);
            this.chessboard.move(pieceSquare, possibleSquare, promotionPiece);

            if (this._expectedMoves) {
              const moveList = this.moveList.flatMap((move) => move);

              if (moveList[moveList.length - 1] === this._expectedMoves[0]) {
                this._expectedMoves = this._expectedMoves.slice(1);
                this.lastMove = this.chessboard.lastMove;
                this.chessboardView = this.chessboard.chessboardView;
                this.checkState = this.chessboard.checkState;
                this.lastMove = this.chessboard.lastMove;
                this.unmarkingPreviouslySelectedAndSafeSquares();
              } else {
                this.chessboard.setBoard(currentGameState);
                this.chessboardView = this.chessboard.chessboardView;
              }
            }
            this.gameHistoryPointer++;
          });
        });
      }
    );
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

  private detectAndMarkMovedPawns(): void {
    this.chessboard.detectAndMarkMovedPawns();
  }
}
