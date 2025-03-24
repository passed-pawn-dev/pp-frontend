import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-tile',
  standalone: true,
  imports: [],
  templateUrl: './question-tile.component.html',
  styleUrl: './question-tile.component.scss'
})
export class QuestionTileComponent {
  @Input() public question!: string;
  @Input() public answer!: string;

  protected showAnswer: boolean = false;

  protected toggleAnswer(): void {
    this.showAnswer = !this.showAnswer;
  }
}
