import { reverse } from 'lodash';
import { ChessBoard, fenCharToPiece } from './board';
import { Color, FenChar, TChessboard, TLastMove } from './models';
import { King } from './pieces/king';
import { Pawn } from './pieces/pawn';
import { Piece } from './pieces/piece';
import { Rook } from './pieces/rook';

export class FenConverter {
  public static readonly initalPosition: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  private static isNumeric(str: unknown): boolean {
    return !isNaN(str as number) && !isNaN(parseFloat(str as string));
  }

  public static convertFenToBoard(fen: string): TChessboard {
    const board = new Map();
    const [fenBoard, playerToMove, castlingAvailability, enPassantSquare] =
      fen.split(' ');
    const files = ChessBoard.FILES.slice().reverse();
    let currentRow = 0;
    let currentColumn = 0;
    let currentFile = ChessBoard.FILES[currentRow];

    for (let char of fenBoard) {
      currentFile = files[currentRow];

      if (char === '/') {
        currentRow = 0;
        currentColumn++;
        continue;
      }

      if (this.isNumeric(char)) {
        for (let i = 0; i < parseInt(char, 10); i++) {
          currentFile = files[currentRow];
          board.set(`${currentFile}${currentColumn + 1}`, null);
          currentRow++;
        }
      } else {
        board.set(
          `${currentFile}${currentColumn + 1}`,
          fenCharToPiece[char as FenChar]
        );
        currentRow++;
      }
    }

    return board;
  }

  public static convertBoardToFen(
    board: TChessboard,
    playerColor: Color,
    lastMove: TLastMove | undefined,
    fiftyMoveRuleCounter: number,
    numberOfFullMoves: number
  ): string {
    let fen: string = '';
    let index = 1;
    let consecutiveEmptySquaresCounter = 0;

    for (let [square, piece] of board) {
      if (piece === null) {
        consecutiveEmptySquaresCounter++;
        if (index % 8 === 0) {
          fen += `${String(consecutiveEmptySquaresCounter)}/`;
          consecutiveEmptySquaresCounter = 0;
        }
        index++;
        continue;
      } else if (consecutiveEmptySquaresCounter !== 0) {
        fen += `${String(consecutiveEmptySquaresCounter)}`;
        consecutiveEmptySquaresCounter = 0;
      }

      fen += piece.fenChar;

      if (index % 8 === 0) fen += '/';
      index++;
    }

    const player: string = playerColor === Color.White ? 'w' : 'b';
    fen += ' ' + player;
    fen += ' ' + this.castlingAvailability(board);
    fen += ' ' + this.enPassantPosibility(lastMove, playerColor);
    fen += ' ' + fiftyMoveRuleCounter * 2;
    fen += ' ' + numberOfFullMoves;
    return fen;
  }

  private static castlingAvailability(board: TChessboard): string {
    const castlingPossibilities = (color: Color): string => {
      let castlingAvailability: string = '';

      const kingPositionX: number = color === Color.White ? 0 : 7;
      const king: Piece | null = board.get(
        ChessBoard.coordsToSquare({ x: kingPositionX, y: 4 })
      ) as Piece | null;

      if (king instanceof King && !king.hasMoved) {
        const rookPositionX: number = kingPositionX;
        const kingSideRook = board.get(
          ChessBoard.coordsToSquare({ x: rookPositionX, y: 7 })
        ) as Piece | null;
        const queenSideRook = board.get(
          ChessBoard.coordsToSquare({ x: rookPositionX, y: 0 })
        ) as Piece | null;

        if (kingSideRook instanceof Rook && !kingSideRook.hasMoved)
          castlingAvailability += 'k';

        if (queenSideRook instanceof Rook && !queenSideRook.hasMoved)
          castlingAvailability += 'q';

        if (color === Color.White)
          castlingAvailability = castlingAvailability.toUpperCase();
      }
      return castlingAvailability;
    };

    const castlingAvailability: string =
      castlingPossibilities(Color.White) + castlingPossibilities(Color.Black);
    return castlingAvailability !== '' ? castlingAvailability : '-';
  }

  private static enPassantPosibility(
    lastMove: TLastMove | undefined,
    color: Color
  ): string {
    if (!lastMove) return '-';
    const { piece, prevSquare, currentSquare } = lastMove;
    const { x: prevX, y: prevY } = ChessBoard.squareToCoords(prevSquare);
    const { x: currX } = ChessBoard.squareToCoords(currentSquare);

    if (piece instanceof Pawn && Math.abs(currX - prevX) === 2) {
      const row: number = color === Color.White ? 6 : 3;
      return ChessBoard.FILES[prevY] + String(row);
    }
    return '-';
  }
}
