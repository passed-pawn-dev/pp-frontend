import { Component, OnInit } from '@angular/core';
import { ChessboardSide } from '../../enums/chessboard-side.enum';
import { TChessPieceFen } from '../../types/chess-piece-fen.type';
import { Button } from 'primeng/button';
import { Color, FenChar } from '../../../../chess-logic/models';
import { Rook } from '../../../../chess-logic/pieces/rook';
import { Pawn } from '../../../../chess-logic/pieces/pawn';
import { Knight } from '../../../../chess-logic/pieces/knight';
import { Bishop } from '../../../../chess-logic/pieces/bishop';
import { King } from '../../../../chess-logic/pieces/king';
import { Queen } from '../../../../chess-logic/pieces/queen';
import { Piece } from '../../../../chess-logic/pieces/piece';
import { pieceImagePaths } from '../../../../chess-logic/models';
import { ChessBoard } from '../../../../chess-logic/board';

@Component({
  selector: 'app-puzzle-chessboard',
  standalone: true,
  imports: [Button],
  templateUrl: './puzzle-chessboard.component.html',
  styleUrl: './puzzle-chessboard.component.scss'
})
export class PuzzleChessboardComponent implements OnInit {
  private chessboard = new ChessBoard();
  protected chessboardView: Map<string, FenChar | null> =
    this.chessboard.chessboardView;
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  protected side = Color.Black;
  protected Color = Color;
  protected pieceImagePaths = pieceImagePaths;

  public ngOnInit(): void {
    this.chessboardView = this.chessboard.chessboardView;
  }

  protected reverseChessboard(): void {
    this.chessboard.reverseChessboard();
    this.chessboardView = this.chessboard.chessboardView;
  }

  protected move(square: string): void {
    console.log(square);
    this.isWrongPieceSelected(this.chessboardView.get(square)!);
  }

  private isWrongPieceSelected(piece: FenChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return (
      (isWhitePieceSelected && this.side === Color.Black) ||
      (!isWhitePieceSelected && this.side === Color.White)
    );
  }
}
