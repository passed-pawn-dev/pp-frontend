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

// TODO - SWAP X WITH Y, FOR SOME REASON X MEANS RANK AND Y MEANS FILE RIGHT NOW IM SORRY
export class ChessBoard {
  protected chessboard: Map<string, Piece | null>;
  protected FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  protected RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  private _playerColor: Color = Color.White;
  private _safeSquares: TSafeSquares;
  private readonly chessBoardSize: number = 8;

  public reverseChessboard(): void {
    this.chessboard = new Map(Array.from(this.chessboard).reverse());
    this._playerColor = this._playerColor === Color.Black ? Color.White : Color.Black;
    this._safeSquares = this.findSafeSquares();
  }

  public constructor() {
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
      d4: new Queen(Color.White),
      e1: new King(Color.White),
      e4: new Bishop(Color.White),
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
      b4: new Queen(Color.Black),
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

    this._safeSquares = this.findSafeSquares();
  }

  public get playerColor(): Color {
    return this._playerColor;
  }

  public get safeSquares(): TSafeSquares {
    return this._safeSquares;
  }

  public get chessboardView(): Map<string, FenChar | null> {
    const chessboardView = new Map();
    for (let [square, piece] of this.chessboard) {
      chessboardView.set(square, piece?.fenChar || null);
    }

    return chessboardView;
  }

  private squareToCoords(square: string): TCoords {
    if (square.length !== 2) {
      throw new Error('Square length should be equal to 2! Example: b4');
    }
    return { x: parseInt(square[1]) - 1, y: this.FILES.indexOf(square[0]) };
  }

  private coordsToSquare(coords: TCoords): string {
    return `${this.FILES[coords.y]}${coords.x + 1}`;
  }

  private isSquareDark(square: string): boolean {
    const coords = this.squareToCoords(square);

    return (
      (coords.x % 2 === 0 && coords.y % 2 === 0) ||
      (coords.x % 2 === 1 && coords.y % 2 === 1)
    );
  }

  private areCoordsValid(coords: TCoords): boolean {
    return (
      coords.x >= 0 &&
      coords.y >= 0 &&
      coords.x < this.chessBoardSize &&
      coords.y < this.chessBoardSize
    );
  }

  private isAllyKing(piece: Piece | null, playerColor: Color): boolean {
    return piece instanceof King && piece.color === playerColor;
  }

  // check piece by piece if any enemy piece is attacking player's King
  public isPlayerInCheck(playerColor: Color): boolean {
    for (let [square, piece] of this.chessboard) {
      // skipping ally pieces - they cant attack ally king
      // const piece: Piece | null = this.chessboard.get(square) as Piece | null;
      if (piece === null || piece.color === playerColor) continue;
      const { x, y } = this.squareToCoords(square);

      for (const { x: dx, y: dy } of piece.directions) {
        if (!this.areCoordsValid({ x: x + dx, y: y + dy })) continue;

        let targetX: number = x + dx;
        let targetY: number = y + dy;
        const targetSquare = this.coordsToSquare({ x: x + dx, y: y + dy });

        // pieces that don't move across the whole board
        if (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {
          if (piece instanceof Pawn && dy === 0) continue;

          const blockingPiece: Piece | null = this.chessboard.get(
            targetSquare
          ) as Piece | null;
          if (this.isAllyKing(blockingPiece, playerColor)) return true;
          // pieces that move across the whole board
        } else {
          while (this.areCoordsValid({ x: targetX, y: targetY })) {
            const targetSquare = this.coordsToSquare({ x: targetX, y: targetY });
            const blockingPiece: Piece | null = this.chessboard.get(
              targetSquare
            ) as Piece | null;

            if (this.isAllyKing(blockingPiece, playerColor)) return true;

            // direction blocked by a non-king piece
            if (blockingPiece !== null) break;

            targetX += dx;
            targetY += dy;
          }
        }
      }
    }

    return false;
  }

  private isPositionSafeAfterMove(
    piece: Piece,
    currentSquare: string,
    targetSquare: string
  ): boolean {
    const targetSquarePiece: Piece | null = this.chessboard.get(
      targetSquare
    ) as Piece | null;
    // same color piece exists on the target square
    if (targetSquarePiece !== null && targetSquarePiece.color === piece.color)
      return false;

    if (currentSquare === 'd2' && targetSquare === 'd3') {
      this.chessboard.set(currentSquare, null);
      this.chessboard.set(targetSquare, piece);

      const positionSafe: boolean = this.isPlayerInCheck(piece.color) === false;

      this.chessboard.set(currentSquare, piece);
      this.chessboard.set(targetSquare, targetSquarePiece);

      return positionSafe;
    }

    return true;
  }

  // finds all squares that at least one ally piece can go to without putting ally king in check
  private findSafeSquares(): TSafeSquares {
    const safeSquares = new Map<string, string[]>();

    for (let [square, piece] of this.chessboard) {
      // skipping enemy pieces

      if (piece === null || piece.color !== this._playerColor) continue;
      const { x, y } = this.squareToCoords(square);
      const piecesSafeSquares: string[] = [];

      for (const { x: dx, y: dy } of piece.directions) {
        if (!this.areCoordsValid({ x: x + dx, y: y + dy })) continue;

        let targetX: number = x + dx;
        let targetY: number = y + dy;
        const targetSquare = this.coordsToSquare({ x: targetX, y: targetY });
        let blockingPiece: Piece | null = this.chessboard.get(
          targetSquare
        ) as Piece | null;

        // ally piece is blocked by other ally piece
        if (blockingPiece !== null && blockingPiece.color === piece.color) {
          continue;
        }

        if (piece instanceof Pawn) {
          if (dx === 2 || dx === -2) {
            // pawns only move by 2 squares, not attack
            if (blockingPiece) continue;

            if (
              this.chessboard.get(
                this.coordsToSquare({ x: targetX + (dx === 2 ? -1 : 1), y: y })
              ) !== null
            )
              continue;
          }

          // cant move pawn one square if is blocked by piece
          if ((dx === 1 || dx === -1) && dy === 0 && blockingPiece !== null) continue;

          // cant move pawn diagonally if ally piece is blocking
          if (
            (dy === 1 || dy === -1) &&
            (blockingPiece === null || piece.color === blockingPiece.color)
          )
            continue;
        }

        if (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {
          if (this.isPositionSafeAfterMove(piece, square, targetSquare))
            piecesSafeSquares.push(targetSquare);
        } else {
          while (this.areCoordsValid({ x: targetX, y: targetY })) {
            const targetSquare = this.coordsToSquare({
              x: targetX,
              y: targetY
            });
            blockingPiece = this.chessboard.get(targetSquare) as Piece | null;
            // direction blocked by an ally piece
            if (blockingPiece !== null && blockingPiece.color === piece.color) break;

            if (this.isPositionSafeAfterMove(piece, square, targetSquare))
              piecesSafeSquares.push(targetSquare);

            if (blockingPiece !== null) break;

            targetX += dx;
            targetY += dy;
          }
        }
      }
      if (piecesSafeSquares.length > 0) {
        safeSquares.set(square, piecesSafeSquares);
      }
    }
    return safeSquares; // Map<square that a piece is on, for example "a2" (pawn)>, <squares the piece can go to without putting ally king in check>
  }
  // public move();
}
