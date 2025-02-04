import { FenChar, TCoords, Color } from '../models';
import { Piece } from './piece';

export class Rook extends Piece {
  private _hasMoved: boolean = false;
  protected override _fenChar: FenChar;
  protected override _directions: TCoords[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  public constructor(private pieceColor: Color) {
    super(pieceColor);
    this._fenChar = pieceColor === Color.White ? FenChar.WhiteRook : FenChar.BlackRook;
  }

  public get hasMoved(): boolean {
    return this._hasMoved;
  }

  public set hasMoved(moved: boolean) {
    this._hasMoved = moved;
  }
}
