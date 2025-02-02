import { FenChar, TCoords, Color } from '../models';
import { Piece } from './piece';

export class Bishop extends Piece {
  protected override _fenChar: FenChar;
  protected override _directions: TCoords[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 }
  ];

  public constructor(private pieceColor: Color) {
    super(pieceColor);
    this._fenChar =
      pieceColor === Color.White ? FenChar.WhiteBishop : FenChar.BlackBishop;
  }
}
