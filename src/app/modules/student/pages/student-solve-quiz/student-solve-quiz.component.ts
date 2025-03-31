import { Component, Signal, computed, signal } from '@angular/core';
import { QuizDetails } from '../../models/QuizDetails';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DisplayChessboardComponent } from '../../../shared/components/display-chessboard/display-chessboard.component';

@Component({
  selector: 'app-student-solve-quiz',
  imports: [DisplayChessboardComponent],
  templateUrl: './student-solve-quiz.component.html',
  styleUrl: './student-solve-quiz.component.scss'
})
export class StudentSolveQuizComponent {
  protected quiz = signal<QuizDetails>({
    id: '1',
    title: 'Italian game',
    question: 'What is the best move in this situation?',
    answers: [
      {
        text: 'Pawn to e4',
        newPosition: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1'
        // move: "e4",
      },
      {
        text: 'Pawn to d4',
        newPosition: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1'
        // move: "d4",
      },
      {
        text: 'Pawn to c4',
        newPosition: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 1'
        // move: "c4",
      },
      {
        text: 'Pawn to b4',
        newPosition: 'rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR w KQkq - 0 1'
        // move: "b4",
      }
    ],
    solution: 0,
    hint: 'Attack the center',
    positon: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    explanation: 'In italian game you should start with e4'
  });

  protected answerSubmitted: boolean = false;
  protected solved: boolean | undefined;
  protected hintShown: boolean = false;

  protected selectedAnswer = signal<number | undefined>(undefined);
  protected boardFen = computed(() =>
    this.selectedAnswer() === undefined
      ? this.quiz().positon!
      : this.quiz().answers[this.selectedAnswer()!].newPosition!
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
