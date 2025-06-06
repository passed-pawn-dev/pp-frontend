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
}
