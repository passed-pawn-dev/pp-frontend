import {
  Color,
  TCoords,
  FenChar,
  TGameHistory,
  TLastMove,
  TMoveList,
  MoveType,
  TSafeSquares
} from './models';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Piece } from './pieces/piece';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';
// LOOOOOOOOOOOOOOGIC
export class ChessBoard {
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  protected side: Color;
  protected chessboard: Map<string, Piece | null>;

  public reverseChessboard(): void {
    this.chessboard = new Map(Array.from(this.chessboard).reverse());
    this.side = this.side === Color.Black ? Color.White : Color.Black;
  }

  public constructor() {
    this.side = Color.White;
    this.chessboard = new Map(
      this.RANKS.flatMap((RANK) => this.FILES.map((FILE) => [`${FILE}${RANK}`, null]))
    );

    this.FILES.forEach((file) => {
      this.RANKS.forEach((rank) => {
        this.chessboard.set(`${file}${rank}`, null);
      });
    });

    const whiteBackRank = {
      a1: new Rook(Color.White),
      b1: new Knight(Color.White),
      c1: new Bishop(Color.White),
      d1: new Queen(Color.White),
      e1: new King(Color.White),
      f1: new Bishop(Color.White),
      g1: new Knight(Color.White),
      h1: new Rook(Color.White),
      a2: new Pawn(Color.White),
      b2: new Pawn(Color.White),
      c2: new Pawn(Color.White),
      d2: new Pawn(Color.White),
      e2: new Pawn(Color.White),
      f2: new Pawn(Color.White),
      g2: new Pawn(Color.White),
      h2: new Pawn(Color.White)
    };

    Object.entries(whiteBackRank).forEach(([square, piece]) => {
      this.chessboard.set(square, piece);
    });

    const blackBackRank = {
      a8: new Rook(Color.Black),
      b8: new Knight(Color.Black),
      c8: new Bishop(Color.Black),
      d8: new Queen(Color.Black),
      e8: new Knight(Color.Black),
      f8: new Bishop(Color.Black),
      g8: new Knight(Color.Black),
      h8: new Rook(Color.Black),
      a7: new Pawn(Color.Black),
      b7: new Pawn(Color.Black),
      c7: new Pawn(Color.Black),
      d7: new Pawn(Color.Black),
      e7: new Pawn(Color.Black),
      f7: new Pawn(Color.Black),
      g7: new Pawn(Color.Black),
      h7: new Pawn(Color.Black)
    };

    Object.entries(blackBackRank).forEach(([square, piece]) => {
      this.chessboard.set(square, piece);
    });
  }

  public get chessboardView(): Map<string, FenChar | null> {
    const chessboardView = new Map();
    for (let [key, value] of this.chessboard) {
      chessboardView.set(key, value?.fenChar || null);
    }

    return chessboardView;
  }
}
