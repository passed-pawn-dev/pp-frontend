import { Color, TCoords, FenChar } from '../models';

export abstract class Piece {
  protected abstract _fenChar: FenChar;
  protected abstract _directions: TCoords[];

  public constructor(private _color: Color) {}

  public get fenChar(): FenChar {
    return this._fenChar;
  }

  public get directions(): TCoords[] {
    return this._directions;
  }

  public get color(): Color {
    return this._color;
  }
}
