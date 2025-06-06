import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color, TMoveList } from '../../../../chess-logic/models';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MoveListComponent {
  @Input({ required: true }) public moveList!: TMoveList;
  @Input({ required: true }) public gameHistoryPointer: number = 0;
  @Input({ required: true }) public gameHistoryLength: number = 0;
  @Input({ required: true }) public startingPlayer!: Color;
  @Output() public showPreviousPositionEvent = new EventEmitter<number>();

  protected Color = Color;

  public showPreviousPosition(moveIndex: number): void {
    this.showPreviousPositionEvent.emit(moveIndex);
  }
}
