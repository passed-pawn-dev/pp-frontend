import { FenChar } from '../../../chess-logic/models';
import { Piece } from '../../../chess-logic/pieces/piece';

type TSquareWithPiece = {
  piece: FenChar;
  square: string;
};

type TSquareWithoutPiece = {
  piece: null;
};

export type TSelectedSquare = TSquareWithPiece | TSquareWithoutPiece;

export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
