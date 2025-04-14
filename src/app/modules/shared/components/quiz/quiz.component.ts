import { Component, Input, computed, input, signal } from '@angular/core';
import { QuizDetails } from '../../../student/models/QuizDetails';
import { DisplayChessboardComponent } from '../display-chessboard/display-chessboard.component';

@Component({
  selector: 'app-quiz',
  imports: [DisplayChessboardComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  public quiz = input.required<QuizDetails>();

  protected answerSubmitted: boolean = false;
  protected solved: boolean | undefined;
  protected hintShown: boolean = false;

  protected selectedAnswer = signal<number | undefined>(undefined);
  protected boardFen = computed(() =>
    this.selectedAnswer() === undefined
      ? this.quiz().fen!
      : this.quiz().answers[this.selectedAnswer()!].newPosition || this.quiz().fen!
  );

  protected lastMove = computed(() =>
    this.selectedAnswer() === undefined
      ? undefined
      : this.quiz().answers[this.selectedAnswer()!].lastMove
  );

  protected selectAnswer(index: number): void {
    this.selectedAnswer.set(index);
  }

  protected showHint(): void {
    this.hintShown = true;
  }

  protected reset(): void {
    this.hintShown = false;
    this.selectedAnswer.set(undefined);
    this.answerSubmitted = false;
    this.solved = undefined;
  }

  protected submitAnswer(): void {
    this.answerSubmitted = true;
    this.solved = this.selectedAnswer() === this.quiz().solution;
  }
}
