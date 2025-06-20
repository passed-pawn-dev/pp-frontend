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
  [FenChar.WhitePawn]: 'pieces/white_pawn_45.svg',
  [FenChar.WhiteKnight]: 'pieces/white_knight_45.svg',
  [FenChar.WhiteBishop]: 'pieces/white_bishop_45.svg',
  [FenChar.WhiteRook]: 'pieces/white_rook_45.svg',
  [FenChar.WhiteQueen]: 'pieces/white_queen_45.svg',
  [FenChar.WhiteKing]: 'pieces/white_king_45.svg',
  [FenChar.BlackPawn]: 'pieces/black_pawn_45.svg',
  [FenChar.BlackKnight]: 'pieces/black_knight_45.svg',
  [FenChar.BlackBishop]: 'pieces/black_bishop_45.svg',
  [FenChar.BlackRook]: 'pieces/black_rook_45.svg',
  [FenChar.BlackQueen]: 'pieces/black_queen_45.svg',
  [FenChar.BlackKing]: 'pieces/black_king_45.svg'
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
  moveType: Set<MoveType>;
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
  board: TChessboardView;
  playerColor: Color;
}[];

export type TChessboardView = Map<string, FenChar | null>;

export type TChessboard = Map<string, Piece | null>;

export type TGameState = {
  board: TChessboard;
  playerToMove: Color;
  lastMove: TLastMove | undefined;
  gameHistory: TGameHistory;
  moveList: TMoveList;
  fullNumberOfMoves: number;
  fiftyMoveRuleCounter: number;
  threeFoldRepetitionDictionary: Map<string, number>;
  threeFoldRepetitionFlag: boolean;
  isGameOver: boolean;
  gameOverMessage: string | undefined;
};

export type TSetGameState = Pick<TGameState, 'board' | 'playerToMove' | 'lastMove'> &
  Partial<Omit<TGameState, 'board' | 'playerToMove' | 'lastMove'>>;
