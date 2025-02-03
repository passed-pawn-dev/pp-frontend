import { Piece } from './pieces/piece';

export enum Color {
  White = 'White',
  Black = 'Black'
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
  [FenChar.WhitePawn]: 'assets/pieces/white_pawn_45.svg',
  [FenChar.WhiteKnight]: 'assets/pieces/white_knight_45.svg',
  [FenChar.WhiteBishop]: 'assets/pieces/white_bishop_45.svg',
  [FenChar.WhiteRook]: 'assets/pieces/white_rook_45.svg',
  [FenChar.WhiteQueen]: 'assets/pieces/white_queen_45.svg',
  [FenChar.WhiteKing]: 'assets/pieces/white_king_45.svg',
  [FenChar.BlackPawn]: 'assets/pieces/black_pawn_45.svg',
  [FenChar.BlackKnight]: 'assets/pieces/black_knight_45.svg',
  [FenChar.BlackBishop]: 'assets/pieces/black_bishop_45.svg',
  [FenChar.BlackRook]: 'assets/pieces/black_rook_45.svg',
  [FenChar.BlackQueen]: 'assets/pieces/black_queen_45.svg',
  [FenChar.BlackKing]: 'assets/pieces/black_king_45.svg'
};

export type TSafeSquares = Map<string, string[]>; // Map<square that a piece is on, for example "a2" (pawn)>, <squares the piece can go to without putting ally king in check>

export enum MoveType {
  Capture = 'Capture',
  Castling = 'Castling',
  Promotion = 'Promotion',
  Check = 'Check',
  CheckMate = 'CheckMate',
  BasicMove = 'BasicMove'
}

export type TLastMove = {
  piece: Piece;
  prevSquare: string;
  currentSquare: string;
};

type TKingChecked = {
  isInCheck: true;
  square: string;
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
