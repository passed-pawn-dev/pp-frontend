import { Component, Signal, computed, signal } from '@angular/core';
import { QuizDetails } from '../../models/QuizDetails';
import { DisplayChessboardComponent } from '../../../shared/components/display-chessboard/display-chessboard.component';
import { Pawn } from '../../../../chess-logic/pieces/pawn';
import { Color, MoveType } from '../../../../chess-logic/models';
import { Bishop } from '../../../../chess-logic/pieces/bishop';
import { Queen } from '../../../../chess-logic/pieces/queen';
import { Knight } from '../../../../chess-logic/pieces/knight';

@Component({
  selector: 'app-student-solve-quiz',
  imports: [DisplayChessboardComponent],
  templateUrl: './student-solve-quiz.component.html',
  styleUrl: './student-solve-quiz.component.scss'
})
export class StudentSolveQuizComponent {
  // protected quiz = signal<QuizDetails>({
  //   id: '1',
  //   title: 'Italian game',
  //   question: 'What is the best move in this situation?',
  //   answers: [
  //     {
  //       text: 'Pawn to e4',
  //       newPosition: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Pawn(Color.White),
  //         prevSquare: "e2",
  //         currentSquare: "e4",
  //         moveType: new Set([MoveType.BasicMove]),
  //       }
  //     },
  //     {
  //       text: 'Pawn to d4',
  //       newPosition: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Pawn(Color.White),
  //         prevSquare: "d2",
  //         currentSquare: "d4",
  //         moveType: new Set([MoveType.BasicMove]),
  //       }
  //     },
  //     {
  //       text: 'Pawn to c4',
  //       newPosition: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Pawn(Color.White),
  //         prevSquare: "c2",
  //         currentSquare: "c4",
  //         moveType: new Set([MoveType.BasicMove]),
  //       }
  //     },
  //     {
  //       text: 'Pawn to b4',
  //       newPosition: 'rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Pawn(Color.White),
  //         prevSquare: "b2",
  //         currentSquare: "b4",
  //         moveType: new Set([MoveType.BasicMove]),
  //       }
  //     }
  //   ],
  //   solution: 0,
  //   hint: 'Attack the center',
  //   positon: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  //   explanation: 'In italian game you should start with e4'
  // });
  protected quiz = signal<QuizDetails>({
    id: '2',
    title: 'Szewczyk',
    question: 'What is the best move to deliver checkmate?',
    answers: [
      {
        text: 'Queen to f2',
        newPosition:
          'rnb1k1nr/pppp1ppp/8/2b1p3/4P3/P1N4P/1PPP1qP1/R1BQKBNR w KQkq - 0 1',
        lastMove: {
          piece: new Queen(Color.Black),
          prevSquare: 'f6',
          currentSquare: 'f2',
          moveType: new Set([MoveType.BasicMove, MoveType.CheckMate])
        }
      },
      {
        text: 'Bishop to f2',
        newPosition:
          'rnb1k1nr/pppp1ppp/5q2/4p3/4P3/P1N4P/1PPP1bP1/R1BQKBNR w KQkq - 0 1',
        lastMove: {
          piece: new Bishop(Color.Black),
          prevSquare: 'c5',
          currentSquare: 'f2',
          moveType: new Set([MoveType.BasicMove])
        }
      },
      {
        text: 'Knight to c6',
        newPosition:
          'r1b1k1nr/pppp1ppp/2n2q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
        lastMove: {
          piece: new Knight(Color.Black),
          prevSquare: 'b8',
          currentSquare: 'c6',
          moveType: new Set([MoveType.BasicMove])
        }
      },
      {
        text: 'Pawn to a6',
        newPosition:
          'rnb1k1nr/1ppp1ppp/p4q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
        lastMove: {
          piece: new Pawn(Color.Black),
          prevSquare: 'a7',
          currentSquare: 'a6',
          moveType: new Set([MoveType.BasicMove])
        }
      }
    ],
    solution: 0,
    hint: 'Exploit the weak f2 square.',
    positon: 'rnb1k1nr/pppp1ppp/5q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
    explanation:
      "Moving the queen to h4 delivers checkmate because White's weak f2 square is exposed, leading to a quick defeat."
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
