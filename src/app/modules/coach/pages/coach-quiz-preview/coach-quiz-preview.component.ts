import { Component, inject } from '@angular/core';
import { QuizDetails } from '../../../shared/models/quiz-details.model';
import { QuizComponent } from '../../../shared/components/quiz/quiz.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-coach-quiz-preview',
  imports: [QuizComponent, RouterLink],
  templateUrl: './coach-quiz-preview.component.html',
  styleUrl: './coach-quiz-preview.component.scss'
})
export class CoachQuizPreviewComponent {
  private route = inject(ActivatedRoute);
  protected quiz: QuizDetails = this.route.snapshot.data['quiz'];
}
