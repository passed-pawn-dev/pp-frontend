import { Piece } from './pieces/piece';

export enum Color {
  White,
  Black
}

export type TCoords = {
  x: number;
  y: number;
};

export enum FenChar {
  WhitePawn = 'P',
  WhiteKnight = 'N',
  WhiteBishop = 'B',
  WhiteRook = 'R',
  WhiteQueen = 'Q',
  WhiteKing = 'K',
  BlackPawn = 'p',
  BlackKnight = 'n',
  BlackBishop = 'b',
  BlackRook = 'r',
  BlackQueen = 'q',
  BlackKing = 'k'
}

export const pieceImagePaths: Readonly<Record<FenChar, string>> = {
  [FenChar.WhitePawn]: 'assets/pieces/white-pawn.svg',
  [FenChar.WhiteKnight]: 'assets/pieces/white-knight.svg',
  [FenChar.WhiteBishop]: 'assets/pieces/white-bishop.svg',
  [FenChar.WhiteRook]: 'assets/pieces/white-rook.svg',
  [FenChar.WhiteQueen]: 'assets/pieces/white-queen.svg',
  [FenChar.WhiteKing]: 'assets/pieces/white-king.svg',
  [FenChar.BlackPawn]: 'assets/pieces/black-pawn.svg',
  [FenChar.BlackKnight]: 'assets/pieces/black-knight.svg',
  [FenChar.BlackBishop]: 'assets/pieces/black-bishop.svg',
  [FenChar.BlackRook]: 'assets/pieces/black-rook.svg',
  [FenChar.BlackQueen]: 'assets/pieces/black-queen.svg',
  [FenChar.BlackKing]: 'assets/pieces/black-king.svg'
};

export type TSafeSquares = Map<string, TCoords[]>;

export enum MoveType {
  Capture,
  Castling,
  Promotion,
  Check,
  CheckMate,
  BasicMove
}

export type TLastMove = {
  piece: Piece;
  prevX: number;
  prevY: number;
  currX: number;
  currY: number;
  moveType: Set<MoveType>;
};

type TKingChecked = {
  isInCheck: true;
  x: number;
  y: number;
};

type TKingNotChecked = {
  isInCheck: false;
};

export type TCheckState = TKingChecked | TKingNotChecked;

export type TMoveList = [string, string?][];

export type TGameHistory = {
  lastMove: TLastMove | undefined;
  checkState: TCheckState;
  board: (FenChar | null)[][];
}[];
