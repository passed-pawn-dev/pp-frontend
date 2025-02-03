import { Component, OnInit } from '@angular/core';
import { ChessboardSide } from '../../enums/chessboard-side.enum';
import { TChessPieceFen } from '../../types/chess-piece-fen.type';
import { Button } from 'primeng/button';
import { Color, FenChar, TSafeSquares } from '../../../../chess-logic/models';
import { Rook } from '../../../../chess-logic/pieces/rook';
import { Pawn } from '../../../../chess-logic/pieces/pawn';
import { Knight } from '../../../../chess-logic/pieces/knight';
import { Bishop } from '../../../../chess-logic/pieces/bishop';
import { King } from '../../../../chess-logic/pieces/king';
import { Queen } from '../../../../chess-logic/pieces/queen';
import { Piece } from '../../../../chess-logic/pieces/piece';
import { pieceImagePaths } from '../../../../chess-logic/models';
import { ChessBoard } from '../../../../chess-logic/board';
import { TSelectedSquare } from '../../models/chessboardViewModels';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puzzle-chessboard',
  standalone: true,
  imports: [Button, CommonModule],
  templateUrl: './puzzle-chessboard.component.html',
  styleUrl: './puzzle-chessboard.component.scss'
})
export class PuzzleChessboardComponent implements OnInit {
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  protected Color = Color;
  private chessboard = new ChessBoard();
  protected chessboardView: Map<string, FenChar | null> =
    this.chessboard.chessboardView;
  private selectedSquare: TSelectedSquare = { piece: null };
  private pieceSafeSquares: string[] = [];
  protected get playerColor(): Color {
    return this.chessboard.playerColor;
  }

  protected get safeSquares(): TSafeSquares {
    return this.chessboard.safeSquares;
  }
  protected pieceImagePaths = pieceImagePaths;

  public ngOnInit(): void {
    this.chessboardView = this.chessboard.chessboardView;
  }

  public isSquareSelected(square: string): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.square === square;
  }

  public isSquareSafeForSelectedPiece(targetSquare: string): boolean {
    return this.pieceSafeSquares.some((square) => square === targetSquare);
  }

  protected selectingPiece(square: string): void {
    const piece = this.chessboardView.get(square) as FenChar | null;
    if (piece === null) return;

    this.selectedSquare = { piece, square };
    this.pieceSafeSquares = this.safeSquares.get(square) || [];
  }

  protected reverseChessboard(): void {
    this.chessboard.reverseChessboard();
    this.chessboardView = this.chessboard.chessboardView;
    this.pieceSafeSquares = [];
    this.selectedSquare = { piece: null };
  }

  protected move(square: string): void {
    this.isWrongPieceSelected(this.chessboardView.get(square)!);
  }

  private isWrongPieceSelected(piece: FenChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return (
      (isWhitePieceSelected && this.playerColor === Color.Black) ||
      (!isWhitePieceSelected && this.playerColor === Color.White)
    );
  }
}
