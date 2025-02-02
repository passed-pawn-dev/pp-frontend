import { FenChar, TCoords, Color } from '../models';
import { Piece } from './piece';

export class Pawn extends Piece {
  private _hasMoved: boolean = false;
  protected override _fenChar: FenChar;
  protected override _directions: TCoords[] = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 }
  ];

  public constructor(private pieceColor: Color) {
    super(pieceColor);
    if (pieceColor === Color.Black) this.setBlackPawnDirections();
    this._fenChar = pieceColor === Color.White ? FenChar.WhitePawn : FenChar.BlackPawn;
  }

  private setBlackPawnDirections(): void {
    this._directions = this._directions.map(({ x, y }) => ({ x: -1 * x, y }));
  }

  public get hasMoved(): boolean {
    return this._hasMoved;
  }

  public set hasMoved(_: unknown) {
    this._hasMoved = true;
    this._directions = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 }
    ];
    if (this.pieceColor === Color.Black) this.setBlackPawnDirections();
  }
}
