import { cloneDeep } from 'lodash';
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
  TCheckState,
  TChessboardView,
  TChessboard,
  TGameState,
  TSetGameState
} from './models';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Piece } from './pieces/piece';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

// like this so that reference is different every time
export const fenCharToPiece = {
  P: (): Pawn => new Pawn(Color.White),
  Q: (): Queen => new Queen(Color.White),
  R: (): Rook => new Rook(Color.White),
  K: (): King => new King(Color.White),
  N: (): Knight => new Knight(Color.White),
  B: (): Bishop => new Bishop(Color.White),
  p: (): Pawn => new Pawn(Color.Black),
  q: (): Queen => new Queen(Color.Black),
  r: (): Rook => new Rook(Color.Black),
  k: (): King => new King(Color.Black),
  n: (): Knight => new Knight(Color.Black),
  b: (): Bishop => new Bishop(Color.Black)
};

// TODO - SWAP X WITH Y, FOR SOME REASON X MEANS RANK AND Y MEANS FILE RIGHT NOW IM SORRY
export class ChessBoard {
  private _chessboard: TChessboard;
  public static FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  public static RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
  private _playerColor: Color = Color.White;
  private _safeSquares: TSafeSquares;
  private _lastMove: TLastMove | undefined;
  private _checkState: TCheckState = { isInCheck: false };
  private _moveList: TMoveList = [];
  private _gameHistory: TGameHistory;
  private _isGameOver: boolean = false;
  private _gameOverMessage: string | undefined;
  private fiftyMoveRuleCounter: number = 0;
  private fullNumberOfMoves: number = 0;
  private threeFoldRepetitionDictionary = new Map<string, number>();
  private threeFoldRepetitionFlag: boolean = false;
  private readonly chessBoardSize: number = 8;

  public reverseChessboard(): void {
    this._chessboard = new Map(Array.from(this._chessboard).reverse());
    // this._playerColor = this._playerColor === Color.Black ? Color.White : Color.Black;
    // this._safeSquares = this.findSafeSquares();
  }

  public constructor() {
    this._chessboard = new Map(
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
    this._gameHistory = [];
  }

  // section - getters
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

  public get chessboardView(): TChessboardView {
    const chessboardView = new Map();
    for (let [square, piece] of this.chessboard) {
      chessboardView.set(square, piece?.fenChar || null);
    }

    return chessboardView;
  }

  public get chessboard(): TChessboard {
    return this._chessboard;
  }

  public get moveList(): TMoveList {
    return this._moveList;
  }

  public get gameHistory(): TGameHistory {
    return this._gameHistory;
  }

  public get isGameOver(): boolean {
    return this._isGameOver;
  }

  public get gameOverMessage(): string | undefined {
    return this._gameOverMessage;
  }

  public get gameState(): TGameState {
    return {
      board: this._chessboard,
      playerToMove: this._playerColor,
      lastMove: this._lastMove,
      gameHistory: this._gameHistory,
      moveList: this._moveList,
      fullNumberOfMoves: this.fullNumberOfMoves,
      fiftyMoveRuleCounter: this.fiftyMoveRuleCounter,
      threeFoldRepetitionDictionary: this.threeFoldRepetitionDictionary,
      threeFoldRepetitionFlag: this.threeFoldRepetitionFlag,
      isGameOver: this._isGameOver,
      gameOverMessage: this.gameOverMessage
    };
  }
  // end section - getters

  // sectiun - static methods
  public static squareToCoords(square: string): TCoords {
    if (square.length !== 2) {
      throw new Error('Square length should be equal to 2! Example: b4');
    }
    return { x: parseInt(square[1]) - 1, y: ChessBoard.FILES.indexOf(square[0]) };
  }

  public static coordsToSquare(coords: TCoords): string {
    return `${ChessBoard.FILES[coords.y]}${coords.x + 1}`;
  }

  public static boardViewToBoard(boardView: TChessboardView): TChessboard {
    const chessboard = new Map();
    for (let [square, fenChar] of boardView) {
      if (fenChar) {
        chessboard.set(square, fenCharToPiece[fenChar]());
      } else {
        chessboard.set(square, null);
      }
    }

    return chessboard;
  }
  // end section - static methods

  // section - public methods
  public setBoard(gameState: TSetGameState): void {
    this._chessboard = gameState.board;
    this._playerColor = gameState.playerToMove;
    this._lastMove = gameState.lastMove;
    this._gameHistory = gameState.gameHistory || [];
    this._moveList = gameState.moveList || [];
    this.fullNumberOfMoves = gameState.fullNumberOfMoves || 0;
    this.fiftyMoveRuleCounter = gameState.fiftyMoveRuleCounter || 0;
    this.threeFoldRepetitionDictionary =
      gameState.threeFoldRepetitionDictionary || new Map();
    this.threeFoldRepetitionFlag = gameState.threeFoldRepetitionFlag || false;
    this._gameOverMessage = gameState.gameOverMessage;
    this._isGameOver = gameState.isGameOver || false;
    this.isPlayerInCheck(gameState.playerToMove, true);
    this._safeSquares = this.findSafeSquares();
  }

  public move(
    currentSquare: string,
    targetSquare: string,
    promotedPieceType: FenChar | null
  ): void {
    if (this._isGameOver) throw new Error("Game is over, can't play moves!");
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

    const moveType = new Set<MoveType>();
    const isPieceTaken: boolean = this.chessboard.get(targetSquare) !== null;
    this.handleSpecialMoves(piece, currentSquare, targetSquare, moveType);

    if (isPieceTaken) moveType.add(MoveType.Capture);

    if (piece instanceof Pawn || isPieceTaken) {
      this.fiftyMoveRuleCounter = 0;
    } else {
      this.fiftyMoveRuleCounter += 0.5;
    }

    if (promotedPieceType) {
      this.chessboard.set(targetSquare, this.promotedPiece(promotedPieceType));
      moveType.add(MoveType.Promotion);
    } else {
      this.chessboard.set(targetSquare, piece);
    }
    this.chessboard.set(currentSquare, null);

    this._lastMove = {
      prevSquare: currentSquare,
      currentSquare: targetSquare,
      piece,
      moveType
    };
    this._playerColor = this._playerColor === Color.White ? Color.Black : Color.White;
    this.isPlayerInCheck(this._playerColor, true);
    const safeSquares: TSafeSquares = this.findSafeSquares();

    if (this._checkState.isInCheck)
      moveType.add(safeSquares.size === 0 ? MoveType.CheckMate : MoveType.Check);
    else if (moveType.size === 0) {
      moveType.add(MoveType.BasicMove);
    }

    this.storeMove(promotedPieceType);
    this.updateGameHistory();

    if (this._playerColor === Color.White) this.fullNumberOfMoves++;

    this.updateThreeFoldRepetitionDictionary(
      FenConverter.convertBoardToFen(
        this.chessboard,
        this._playerColor,
        this._lastMove,
        this.fiftyMoveRuleCounter,
        this.fullNumberOfMoves
      )
    );
    this._safeSquares = safeSquares;
    this._isGameOver = this.isGameFinished();
  }
  // end section - public methods;

  private isSquareDark(x: number, y: number): boolean {
    return (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1);
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

  // check piece by piece if any enemy piece is attacking player's King, sets checkState
  private isPlayerInCheck(
    playerColor: Color,
    checkingCurrentPosition: boolean
  ): boolean {
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
            if (checkingCurrentPosition)
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
              if (checkingCurrentPosition)
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
    if (checkingCurrentPosition) this._checkState = { isInCheck: false };
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

    if (!(rook instanceof Rook) || rook.hasMoved || this._checkState.isInCheck) {
      return false;
    }

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
    ) {
      return false;
    }

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
    targetSquare: string,
    moveType: Set<MoveType>
  ): void {
    const { x: currentX, y: currentY } = ChessBoard.squareToCoords(currentSquare);
    const { x: _targetX, y: targetY } = ChessBoard.squareToCoords(targetSquare);

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
      moveType.add(MoveType.Castling);
    } else {
      if (!this._lastMove) return;
      const { x: lastMovePrevX, y: _lastMovePrevY } = ChessBoard.squareToCoords(
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
        moveType.add(MoveType.Capture);
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

  private storeMove(promotedPiece: FenChar | null): void {
    const { piece, prevSquare, currentSquare, moveType } = this._lastMove!;
    const { y: prevY } = ChessBoard.squareToCoords(prevSquare);
    const { x: currX, y: currY } = ChessBoard.squareToCoords(currentSquare);
    let pieceName: string = !(piece instanceof Pawn) ? piece.fenChar.toUpperCase() : '';
    let move: string;

    if (moveType.has(MoveType.Castling)) move = currY - prevY === 2 ? 'O-O' : 'O-O-O';
    else {
      move = pieceName + this.startingPieceCoordsNotation();
      if (moveType.has(MoveType.Capture))
        move += piece instanceof Pawn ? ChessBoard.FILES[prevY] + 'x' : 'x';
      move += ChessBoard.FILES[currY] + String(currX + 1);

      if (promotedPiece) move += '=' + promotedPiece.toUpperCase();
    }

    if (moveType.has(MoveType.Check)) move += '+';
    else if (moveType.has(MoveType.CheckMate)) move += '#';

    if (!this._moveList[Math.floor(this.gameHistory.length / 2)]) {
      this._moveList[Math.floor(this.gameHistory.length / 2)] = [move];
    } else {
      this._moveList[Math.floor(this.gameHistory.length / 2)].push(move);
    }
  }

  private startingPieceCoordsNotation(): string {
    const { piece: currPiece, prevSquare, currentSquare } = this._lastMove!;
    const { x: prevX, y: prevY } = ChessBoard.squareToCoords(prevSquare);

    if (currPiece instanceof Pawn || currPiece instanceof King) return '';

    const samePiecesCoords: TCoords[] = [{ x: prevX, y: prevY }];

    for (let [square, _piece] of this.chessboard) {
      const { x, y } = ChessBoard.squareToCoords(square);
      const piece: Piece | null = this.chessboard.get(square) as Piece | null;
      if (!piece || currentSquare === square) continue;

      if (piece.fenChar === currPiece.fenChar) {
        const safeSquares: string[] = this._safeSquares.get(square) || [];
        const pieceHasSameTargetSquare: boolean = safeSquares.some(
          (_safeSquare) => currentSquare
        );
        if (pieceHasSameTargetSquare) samePiecesCoords.push({ x, y });
      }
    }

    if (samePiecesCoords.length === 1) return '';

    const piecesFile = new Set(samePiecesCoords.map((coords) => coords.y));
    const piecesRank = new Set(samePiecesCoords.map((coords) => coords.x));

    // means that all of the pieces are on different files (a, b, c, ...)
    if (piecesFile.size === samePiecesCoords.length) return ChessBoard.FILES[prevY];

    // means that all of the pieces are on different rank (1, 2, 3, ...)
    if (piecesRank.size === samePiecesCoords.length) return String(prevX + 1);

    // in case that there are pieces that shares both rank and a file with multiple or one piece
    return ChessBoard.FILES[prevY] + String(prevX + 1);
  }

  private playerHasOnlyTwoKnightsAndKing(
    pieces: { piece: Piece; x: number; y: number }[]
  ): boolean {
    return pieces.filter((piece) => piece.piece instanceof Knight).length === 2;
  }

  private playerHasOnlyBishopsWithSameColorAndKing(
    pieces: { piece: Piece; x: number; y: number }[]
  ): boolean {
    const bishops = pieces.filter((piece) => piece.piece instanceof Bishop);
    const areAllBishopsOfSameColor =
      new Set(bishops.map((bishop) => this.isSquareDark(bishop.x, bishop.y))).size ===
      1;
    return bishops.length === pieces.length - 1 && areAllBishopsOfSameColor;
  }

  private insufficientMaterial(): boolean {
    const whitePieces: { piece: Piece; x: number; y: number }[] = [];
    const blackPieces: { piece: Piece; x: number; y: number }[] = [];

    for (let [square, piece] of this.chessboard) {
      if (!piece) continue;
      const { x, y } = ChessBoard.squareToCoords(square);

      if (piece.color === Color.White) whitePieces.push({ piece, x, y });
      else blackPieces.push({ piece, x, y });
    }

    // King vs King
    if (whitePieces.length === 1 && blackPieces.length === 1) return true;

    // King and Minor Piece vs King
    if (whitePieces.length === 1 && blackPieces.length === 2)
      return blackPieces.some(
        (piece) => piece.piece instanceof Knight || piece.piece instanceof Bishop
      );
    else if (whitePieces.length === 2 && blackPieces.length === 1)
      return whitePieces.some(
        (piece) => piece.piece instanceof Knight || piece.piece instanceof Bishop
      );
    // both sides have bishop of same color
    else if (whitePieces.length === 2 && blackPieces.length === 2) {
      const whiteBishop = whitePieces.find((piece) => piece.piece instanceof Bishop);
      const blackBishop = blackPieces.find((piece) => piece.piece instanceof Bishop);

      if (whiteBishop && blackBishop) {
        const areBishopsOfSameColor: boolean =
          (this.isSquareDark(whiteBishop.x, whiteBishop.y) &&
            this.isSquareDark(blackBishop.x, blackBishop.y)) ||
          (!this.isSquareDark(whiteBishop.x, whiteBishop.y) &&
            !this.isSquareDark(blackBishop.x, blackBishop.y));

        return areBishopsOfSameColor;
      }
    }

    if (
      (whitePieces.length === 3 &&
        blackPieces.length === 1 &&
        this.playerHasOnlyTwoKnightsAndKing(whitePieces)) ||
      (whitePieces.length === 1 &&
        blackPieces.length === 3 &&
        this.playerHasOnlyTwoKnightsAndKing(blackPieces))
    )
      return true;

    if (
      (whitePieces.length >= 3 &&
        blackPieces.length === 1 &&
        this.playerHasOnlyBishopsWithSameColorAndKing(whitePieces)) ||
      (whitePieces.length === 1 &&
        blackPieces.length >= 3 &&
        this.playerHasOnlyBishopsWithSameColorAndKing(blackPieces))
    )
      return true;

    return false;
  }

  public startFromMove(moveIndex: number): void {
    if (moveIndex > this.gameHistory.length)
      throw new Error(
        'Cannot start from move number thats bigger than game history length'
      );

    const fullMoveIndex = Math.floor(moveIndex / 2);
    const moveSideIndex = moveIndex - fullMoveIndex * 2;

    if (moveSideIndex === 1) {
      const moveList = this._moveList.slice(fullMoveIndex);

      this._moveList = moveList
        .map((move, index) => {
          if (index === moveList.length - 1) {
            return [move[1]];
          } else {
            return [move[1], moveList[index + 1][0]];
          }
        })
        .filter((move) => move[0] !== undefined) as TMoveList;
    } else {
      this._moveList = this._moveList.slice(fullMoveIndex);
    }

    this._playerColor = this._gameHistory[this._gameHistory.length - 1].playerColor;
    this._gameHistory = this._gameHistory.slice(moveIndex);
    this.fullNumberOfMoves = 0;
    this.fiftyMoveRuleCounter = 0;
    this.threeFoldRepetitionDictionary = new Map();
    this._safeSquares = this.findSafeSquares();
  }

  private updateGameHistory(): void {
    this._gameHistory.push({
      board: cloneDeep(this.chessboardView),
      checkState: cloneDeep(this._checkState),
      lastMove: this._lastMove ? cloneDeep(this._lastMove) : undefined,
      playerColor: this._playerColor
    });
  }

  private isGameFinished(): boolean {
    if (this.insufficientMaterial()) {
      this._gameOverMessage = 'Draw due to insufficient material position!';
      return true;
    }
    if (this._safeSquares.size === 0) {
      if (this._checkState.isInCheck) {
        const winner: string = this._playerColor === Color.White ? 'Black' : 'White';

        this._gameOverMessage = winner + ' won by checkmate!';
      } else {
        this._gameOverMessage = 'Stalemate!';
      }
      return true;
    }

    if (this.threeFoldRepetitionFlag) {
      this._gameOverMessage = 'Draw due to three fold repetition rule!';
    }

    if (this.fiftyMoveRuleCounter === 50) {
      this._gameOverMessage = 'Draw due to fifty move rule!';
      return true;
    }
    return false;
  }

  private updateThreeFoldRepetitionDictionary(fen: string): void {
    const threeFoldRepetitionFenKey: string = fen.split(' ').slice(0, 4).join('');
    const threeFoldRepetionValue: number | undefined =
      this.threeFoldRepetitionDictionary.get(threeFoldRepetitionFenKey);

    if (threeFoldRepetionValue === undefined)
      this.threeFoldRepetitionDictionary.set(threeFoldRepetitionFenKey, 1);
    else {
      if (threeFoldRepetionValue === 2) {
        this.threeFoldRepetitionFlag = true;
        return;
      }
      this.threeFoldRepetitionDictionary.set(threeFoldRepetitionFenKey, 2);
    }
  }

  public playMovesFromAlgebraicNotation(algebraicNotationMoves: string[]): void {
    algebraicNotationMoves.forEach((move) => {
      this.safeSquares.forEach((possibleSquares: string[], pieceSquare: string) => {
        possibleSquares.forEach((possibleSquare) => {
          const allPieces: (FenChar | null)[] = [...Object.values(FenChar), null];

          allPieces.forEach((promotionPiece) => {
            const currentGameState = cloneDeep(this.gameState);
            this.move(pieceSquare, possibleSquare, promotionPiece);

            const moveList = this.moveList.flatMap((move) => move);

            if (moveList[moveList.length - 1] !== move) {
              this.setBoard(currentGameState);
            }
          });
        });
      });
    });
  }
}
