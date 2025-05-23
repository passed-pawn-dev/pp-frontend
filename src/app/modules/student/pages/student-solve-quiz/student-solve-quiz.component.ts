import { Component, OnInit, inject, signal } from '@angular/core';
import { QuizDetails } from '../../models/quiz-details.model';
import { QuizComponent } from '../../../shared/components/quiz/quiz.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-solve-quiz',
  imports: [QuizComponent],
  templateUrl: './student-solve-quiz.component.html',
  styleUrl: './student-solve-quiz.component.scss'
})
export class StudentSolveQuizComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  protected quiz = signal<QuizDetails>({
    id: '',
    title: '',
    question: '',
    answers: [],
    solution: 0
  });

  public ngOnInit(): void {
    const quiz = this.route.snapshot.data['quiz'];
    this.quiz.set(quiz);
  }

  protected back(): void {
    this.location.back();
  }

  // protected quiz = signal<QuizDetails>({
  //   id: '2',
  //   title: 'Szewczyk',
  //   question: 'What is the best move to deliver checkmate?',
  //   answers: [
  //     {
  //       text: 'Queen to f2',
  //       newPosition:
  //         'rnb1k1nr/pppp1ppp/8/2b1p3/4P3/P1N4P/1PPP1qP1/R1BQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Queen(Color.Black),
  //         prevSquare: 'f6',
  //         currentSquare: 'f2',
  //         moveType: new Set([MoveType.BasicMove, MoveType.CheckMate])
  //       }
  //     },
  //     {
  //       text: 'Bishop to f2',
  //       newPosition:
  //         'rnb1k1nr/pppp1ppp/5q2/4p3/4P3/P1N4P/1PPP1bP1/R1BQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Bishop(Color.Black),
  //         prevSquare: 'c5',
  //         currentSquare: 'f2',
  //         moveType: new Set([MoveType.BasicMove])
  //       }
  //     },
  //     {
  //       text: 'Knight to c6',
  //       newPosition:
  //         'r1b1k1nr/pppp1ppp/2n2q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Knight(Color.Black),
  //         prevSquare: 'b8',
  //         currentSquare: 'c6',
  //         moveType: new Set([MoveType.BasicMove])
  //       }
  //     },
  //     {
  //       text: 'Pawn to a6',
  //       newPosition:
  //         'rnb1k1nr/1ppp1ppp/p4q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
  //       lastMove: {
  //         piece: new Pawn(Color.Black),
  //         prevSquare: 'a7',
  //         currentSquare: 'a6',
  //         moveType: new Set([MoveType.BasicMove])
  //       }
  //     }
  //   ],
  //   solution: 0,
  //   hint: 'Exploit the weak f2 square.',
  //   positon: 'rnb1k1nr/pppp1ppp/5q2/2b1p3/4P3/P1N4P/1PPP1PP1/R1BQKBNR w KQkq - 0 1',
  //   explanation:
  //     "Moving the queen to h4 delivers checkmate because White's weak f2 square is exposed, leading to a quick defeat."
  // });
}
