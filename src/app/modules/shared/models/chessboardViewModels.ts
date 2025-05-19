import { FenChar } from '../../../chess-logic/models';

type TSquareWithPiece = {
  piece: FenChar;
  square: string;
};

type TSquareWithoutPiece = {
  piece: null;
};

export type TSelectedSquare = TSquareWithPiece | TSquareWithoutPiece;

export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
