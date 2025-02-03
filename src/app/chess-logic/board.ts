import { FenConverter } from './FenConverter';
import {
  Color,
  TCoords,
  FenChar,
  TGameHistory,
  TMoveList,
  MoveType,
  TSafeSquares,
  TLastMove,
  TCheckState
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
  public static FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  public static RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  private _playerColor: Color = Color.White;
  private _safeSquares: TSafeSquares;
  private _lastMove: TLastMove | undefined;
  private _checkState: TCheckState = { isInCheck: false };
  private readonly chessBoardSize: number = 8;

  public reverseChessboard(): void {
    this.chessboard = new Map(Array.from(this.chessboard).reverse());
    this._playerColor = this._playerColor === Color.Black ? Color.White : Color.Black;
    this._safeSquares = this.findSafeSquares();
  }

  public constructor() {
    this.chessboard = new Map(
      ChessBoard.RANKS.flatMap((RANK) =>
        ChessBoard.FILES.map((FILE) => [`${FILE}${RANK}`, null])
      )
    );

    ChessBoard.FILES.forEach((file) => {
      ChessBoard.RANKS.forEach((rank) => {
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
      h1: new Rook(Color.White),
      g1: new Knight(Color.White),
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
      e8: new King(Color.Black),
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

  public get lastMove(): TLastMove | undefined {
    return this._lastMove;
  }

  public get checkState(): TCheckState {
    return this._checkState;
  }

  public get chessboardView(): Map<string, FenChar | null> {
    const chessboardView = new Map();
    for (let [square, piece] of this.chessboard) {
      chessboardView.set(square, piece?.fenChar || null);
    }

    return chessboardView;
  }

  public static squareToCoords(square: string): TCoords {
    if (square.length !== 2) {
      throw new Error('Square length should be equal to 2! Example: b4');
    }
    return { x: parseInt(square[1]) - 1, y: ChessBoard.FILES.indexOf(square[0]) };
  }

  public static coordsToSquare(coords: TCoords): string {
    return `${ChessBoard.FILES[coords.y]}${coords.x + 1}`;
  }

  private isSquareDark(square: string): boolean {
    const coords = ChessBoard.squareToCoords(square);

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
  public isPlayerInCheck(playerColor: Color, checkingCurentPosition: boolean): boolean {
    for (let [square, piece] of this.chessboard) {
      // skipping ally pieces - they cant attack ally king
      // const piece: Piece | null = this.chessboard.get(square) as Piece | null;
      if (piece === null || piece.color === playerColor) continue;
      const { x, y } = ChessBoard.squareToCoords(square);

      for (const { x: dx, y: dy } of piece.directions) {
        if (!this.areCoordsValid({ x: x + dx, y: y + dy })) continue;

        let targetX: number = x + dx;
        let targetY: number = y + dy;
        const targetSquare = ChessBoard.coordsToSquare({ x: x + dx, y: y + dy });

        // pieces that don't move across the whole board
        if (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {
          if (piece instanceof Pawn && dy === 0) continue;

          const blockingPiece: Piece | null = this.chessboard.get(
            targetSquare
          ) as Piece | null;
          if (this.isAllyKing(blockingPiece, playerColor)) {
            if (checkingCurentPosition)
              this._checkState = { isInCheck: true, square: targetSquare };
            return true;
          }
          // pieces that move across the whole board
        } else {
          while (this.areCoordsValid({ x: targetX, y: targetY })) {
            const targetSquare = ChessBoard.coordsToSquare({ x: targetX, y: targetY });
            const blockingPiece: Piece | null = this.chessboard.get(
              targetSquare
            ) as Piece | null;

            if (this.isAllyKing(blockingPiece, playerColor)) {
              if (checkingCurentPosition)
                this._checkState = { isInCheck: true, square: targetSquare };
              return true;
            }

            // direction blocked by a non-king piece
            if (blockingPiece !== null) break;

            targetX += dx;
            targetY += dy;
          }
        }
      }
    }
    if (checkingCurentPosition) this._checkState = { isInCheck: false };
    return false;
  }

  private isPositionSafeAfterMove(
    currentSquare: string,
    targetSquare: string
  ): boolean {
    const piece: Piece | null = this.chessboard.get(currentSquare) as Piece | null;

    if (piece === null) return false;
    const targetSquarePiece: Piece | null = this.chessboard.get(
      targetSquare
    ) as Piece | null;
    // same color piece exists on the target square
    if (targetSquarePiece !== null && targetSquarePiece.color === piece.color)
      return false;

    this.chessboard.set(currentSquare, null);
    this.chessboard.set(targetSquare, piece);
    const positionSafe: boolean = this.isPlayerInCheck(piece.color, false) === false;

    this.chessboard.set(currentSquare, piece);
    this.chessboard.set(targetSquare, targetSquarePiece);

    return positionSafe;
  }

  // finds all squares that at least one ally piece can go to without putting ally king in check
  private findSafeSquares(): TSafeSquares {
    const safeSquares = new Map<string, string[]>();

    for (let [square, piece] of this.chessboard) {
      // skipping enemy pieces

      if (piece === null || piece.color !== this._playerColor) continue;
      const { x, y } = ChessBoard.squareToCoords(square);
      const piecesSafeSquares: string[] = [];

      for (const { x: dx, y: dy } of piece.directions) {
        if (!this.areCoordsValid({ x: x + dx, y: y + dy })) continue;

        let targetX: number = x + dx;
        let targetY: number = y + dy;
        const targetSquare = ChessBoard.coordsToSquare({ x: targetX, y: targetY });
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
                ChessBoard.coordsToSquare({ x: targetX + (dx === 2 ? -1 : 1), y: y })
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
          if (this.isPositionSafeAfterMove(square, targetSquare))
            piecesSafeSquares.push(targetSquare);
        } else {
          while (this.areCoordsValid({ x: targetX, y: targetY })) {
            const targetSquare = ChessBoard.coordsToSquare({
              x: targetX,
              y: targetY
            });
            blockingPiece = this.chessboard.get(targetSquare) as Piece | null;
            // direction blocked by an ally piece
            if (blockingPiece !== null && blockingPiece.color === piece.color) break;

            if (this.isPositionSafeAfterMove(square, targetSquare))
              piecesSafeSquares.push(targetSquare);

            if (blockingPiece !== null) break;

            targetX += dx;
            targetY += dy;
          }
        }
      }
      if (piece instanceof King) {
        if (this.canCastle(piece, true)) {
          piecesSafeSquares.push(ChessBoard.coordsToSquare({ x, y: 6 }));
        }

        if (this.canCastle(piece, false)) {
          piecesSafeSquares.push(ChessBoard.coordsToSquare({ x, y: 2 }));
        }
      } else if (piece instanceof Pawn && this.canCaptureEnPassant(piece, square)) {
        piecesSafeSquares.push(
          ChessBoard.coordsToSquare({
            x: x + (piece.color === Color.White ? 1 : -1),
            y: ChessBoard.squareToCoords(this._lastMove!.prevSquare).y
          })
        );
      }
      if (piecesSafeSquares.length > 0) {
        safeSquares.set(square, piecesSafeSquares);
      }
    }
    return safeSquares; // Map<square that a piece is on, for example "a2" (pawn)>, <squares the piece can go to without putting ally king in check>
  }
  public move(
    currentSquare: string,
    targetSquare: string,
    promotedPieceType: FenChar | null
  ): void {
    const { x: currentX, y: currentY } = ChessBoard.squareToCoords(currentSquare);
    const { x: targetX, y: targetY } = ChessBoard.squareToCoords(targetSquare);
    if (
      !this.areCoordsValid({ x: currentX, y: currentY }) ||
      !this.areCoordsValid({ x: targetX, y: targetY })
    )
      return;

    const piece: Piece | null = this.chessboard.get(currentSquare) as Piece | null;

    if (piece === null || piece.color !== this._playerColor) return;

    const pieceSafeSquares: string[] | undefined = this._safeSquares.get(currentSquare);

    if (
      pieceSafeSquares === undefined ||
      !pieceSafeSquares.find((square) => square === targetSquare)
    )
      throw new Error('Square is not safe');

    // pieces that behave differently after first move
    if (piece instanceof Pawn || piece instanceof King || piece instanceof Rook)
      piece.hasMoved = true;

    this.handleSpecialMoves(piece, currentSquare, targetSquare);

    if (promotedPieceType) {
      this.chessboard.set(targetSquare, this.promotedPiece(promotedPieceType));
    } else {
      this.chessboard.set(targetSquare, piece);
    }

    this.chessboard.set(currentSquare, null);

    this._lastMove = { prevSquare: currentSquare, currentSquare: targetSquare, piece };
    this._playerColor = this._playerColor === Color.White ? Color.Black : Color.White;
    this.isPlayerInCheck(this._playerColor, true);
    this._safeSquares = this.findSafeSquares();
  }

  private canCastle(king: King, kingSideCastle: boolean): boolean {
    if (king.hasMoved) return false;

    const kingPositionX: number = king.color === Color.White ? 0 : 7;
    const kingPositionY: number = 4;
    const kingSquare: string = ChessBoard.coordsToSquare({
      x: kingPositionX,
      y: kingPositionY
    });

    const rookPositionX: number = kingPositionX;
    const rookPositionY: number = kingSideCastle ? 7 : 0;
    const rookSquare: string = ChessBoard.coordsToSquare({
      x: rookPositionX,
      y: rookPositionY
    });

    const rook: Piece | null = this.chessboard.get(rookSquare) as Piece | null;

    if (!(rook instanceof Rook) || rook.hasMoved || this._checkState.isInCheck)
      return false;

    const firstNextKingPositionY: number = kingPositionY + (kingSideCastle ? 1 : -1);
    const secondNextKingPositionY: number = kingPositionY + (kingSideCastle ? 2 : -2);
    const firstNextKingSquare: string = ChessBoard.coordsToSquare({
      x: kingPositionX,
      y: firstNextKingPositionY
    });
    const secondNextKingSquare: string = ChessBoard.coordsToSquare({
      x: kingPositionX,
      y: secondNextKingPositionY
    });

    if (
      this.chessboard.get(firstNextKingSquare) ||
      this.chessboard.get(secondNextKingSquare)
    )
      return false;

    if (
      !kingSideCastle &&
      this.chessboard.get(ChessBoard.coordsToSquare({ x: kingPositionX, y: 1 }))
    )
      return false;

    return (
      this.isPositionSafeAfterMove(kingSquare, firstNextKingSquare) &&
      this.isPositionSafeAfterMove(kingSquare, secondNextKingSquare)
    );
  }

  private canCaptureEnPassant(pawn: Pawn, pawnSquare: string): boolean {
    if (!this._lastMove) return false;
    const { piece, prevSquare, currentSquare } = this._lastMove;
    const { x: pawnX, y: pawnY } = ChessBoard.squareToCoords(pawnSquare);
    const { x: prevX } = ChessBoard.squareToCoords(prevSquare);
    const { x: currX, y: currY } = ChessBoard.squareToCoords(currentSquare);

    if (
      !(piece instanceof Pawn) ||
      pawn.color !== this._playerColor ||
      Math.abs(currX - prevX) !== 2 ||
      pawnX !== currX ||
      Math.abs(pawnY - currY) !== 1
    )
      return false;

    const pawnNewPositionX: number = pawnX + (pawn.color === Color.White ? 1 : -1);
    const pawnNewPositionY: number = currY;

    this.chessboard.set(ChessBoard.coordsToSquare({ x: currX, y: currY }), null);

    const isPositionSafe: boolean = this.isPositionSafeAfterMove(
      ChessBoard.coordsToSquare({ x: pawnX, y: pawnY }),
      ChessBoard.coordsToSquare({ x: pawnNewPositionX, y: pawnNewPositionY })
    );

    this.chessboard.set(ChessBoard.coordsToSquare({ x: currX, y: currY }), piece);

    return isPositionSafe;
  }

  private handleSpecialMoves(
    piece: Piece,
    currentSquare: string,
    targetSquare: string
  ): void {
    const { x: currentX, y: currentY } = ChessBoard.squareToCoords(currentSquare);
    const { x: targetX, y: targetY } = ChessBoard.squareToCoords(targetSquare);

    if (piece instanceof King && Math.abs(targetY - currentY) === 2) {
      // targetY > currentY === king side castle
      const rookPositionX: number = currentX;
      const rookPositionY: number = targetY > currentY ? 7 : 0;
      const rook = this.chessboard.get(
        ChessBoard.coordsToSquare({ x: rookPositionX, y: rookPositionY })
      ) as Rook;
      const rookNewPositionY: number = targetY > currentY ? 5 : 3;
      this.chessboard.set(
        ChessBoard.coordsToSquare({ x: rookPositionX, y: rookPositionY }),
        null
      );
      this.chessboard.set(
        ChessBoard.coordsToSquare({ x: rookPositionX, y: rookNewPositionY }),
        rook
      );
      rook.hasMoved = true;
    } else {
      if (!this._lastMove) return;
      const { x: lastMovePrevX, y: lastMovePrevY } = ChessBoard.squareToCoords(
        this._lastMove.prevSquare
      );
      const { x: lastMoveCurrX, y: lastMoveCurrY } = ChessBoard.squareToCoords(
        this._lastMove.currentSquare
      );

      if (
        (piece instanceof Pawn && this._lastMove.piece instanceof Pawn,
        Math.abs(lastMoveCurrX - lastMovePrevX) === 2 &&
          currentX === lastMoveCurrX &&
          targetY === lastMoveCurrY)
      ) {
        this.chessboard.set(this._lastMove.currentSquare, null);
      }
    }
  }

  private promotedPiece(promotedPieceType: FenChar): Knight | Bishop | Rook | Queen {
    if (
      promotedPieceType === FenChar.WhiteKnight ||
      promotedPieceType === FenChar.BlackKnight
    )
      return new Knight(this._playerColor);

    if (
      promotedPieceType === FenChar.WhiteBishop ||
      promotedPieceType === FenChar.BlackBishop
    )
      return new Bishop(this._playerColor);

    if (
      promotedPieceType === FenChar.WhiteRook ||
      promotedPieceType === FenChar.BlackRook
    )
      return new Rook(this._playerColor);

    return new Queen(this._playerColor);
  }
}
