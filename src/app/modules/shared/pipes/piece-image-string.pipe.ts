import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pieceImageString',
  standalone: true
})
export class PieceImageString implements PipeTransform {
  public transform(piece: string): string {
    if (!piece) {
      return '';
    }

    const color = piece === piece.toUpperCase() ? 'white' : 'black';
    console.log(piece, color);

    return `${color}_${piece}_45`;
  }
}
