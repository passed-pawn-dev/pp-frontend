import { Component, OnInit } from '@angular/core';
import { ChessboardSide } from '../../enums/chessboard-side.enum';
import { TChessPieceFen } from '../../types/chess-piece-fen.type';
import { ChessPieceDirective } from '../../directives/chess-piece.directive';
import { PieceImageString } from '../../pipes/piece-image-string.pipe';
import { Button } from 'primeng/button';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-puzzle-chessboard',
  standalone: true,
  imports: [ChessPieceDirective, Button, PieceImageString],
  templateUrl: './puzzle-chessboard.component.html',
  styleUrl: './puzzle-chessboard.component.scss'
})
export class PuzzleChessboardComponent implements OnInit {
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  protected side = ChessboardSide.Black;
  // protected ChessboardSide = ChessboardSide;
  protected ChessboardSide = ChessboardSide;
  protected chessboard: Map<string, string | null> = new Map(
    this.RANKS.flatMap((RANK) => this.FILES.map((FILE) => [`${FILE}${RANK}`, null]))
  );

  public ngOnInit(): void {
    this.setDefaultPosition();
    console.log(this.chessboard);
  }

  protected setDefaultPosition(): void {
    this.FILES.forEach((file) => {
      this.RANKS.forEach((rank) => {
        this.chessboard.set(`${file}${rank}`, null);
      });
    });

    const whiteBackRank = {
      a1: 'R',
      b1: 'N',
      c1: 'B',
      d1: 'Q',
      e1: 'K',
      f1: 'B',
      g1: 'N',
      h1: 'R',
      a2: 'P',
      b2: 'P',
      c2: 'P',
      d2: 'P',
      e2: 'P',
      f2: 'P',
      g2: 'P',
      h2: 'P'
    };

    Object.entries(whiteBackRank).forEach(([square, piece]) => {
      this.chessboard.set(square, piece);
    });

    const blackBackRank = {
      a8: 'r',
      b8: 'n',
      c8: 'b',
      d8: 'q',
      e8: 'k',
      f8: 'b',
      g8: 'n',
      h8: 'r',
      a7: 'p',
      b7: 'p',
      c7: 'p',
      d7: 'p',
      e7: 'p',
      f7: 'p',
      g7: 'p',
      h7: 'p'
    };

    Object.entries(blackBackRank).forEach(([square, piece]) => {
      this.chessboard.set(square, piece);
    });
  }

  protected reverseChessboard(): void {
    this.chessboard = new Map(Array.from(this.chessboard).reverse());
  }

  protected movePiece(): void {}
}
