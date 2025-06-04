import { Component, inject } from '@angular/core';
import { Color, FenChar, pieceImagePaths } from '../../../../chess-logic/models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-promotion-dialog',
  imports: [],
  templateUrl: './promotion-dialog.component.html',
  styleUrl: './promotion-dialog.component.scss'
})
export class PromotionDialogComponent {
  [x: string]: any;
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  private playerColor: Color = this.config.data.playerColor;

  protected pieceImagePaths = pieceImagePaths;

  public promotionPieces(): FenChar[] {
    return this.playerColor === Color.White
      ? [
          FenChar.WhiteKnight,
          FenChar.WhiteBishop,
          FenChar.WhiteRook,
          FenChar.WhiteQueen
        ]
      : [
          FenChar.BlackKnight,
          FenChar.BlackBishop,
          FenChar.BlackRook,
          FenChar.BlackQueen
        ];
  }

  protected promotePiece(piece: FenChar): void {
    this.ref.close(piece);
  }
}
