import { Component } from '@angular/core';
import { ChessboardEditorComponent } from '../../../shared/components/chessboard-editor/chessboard-editor.component';

@Component({
  selector: 'app-coach-add-quiz-component',
  imports: [ChessboardEditorComponent],
  templateUrl: './coach-add-quiz-component.component.html',
  styleUrl: './coach-add-quiz-component.component.scss'
})
export class CoachAddQuizComponentComponent {
  protected onNewFen(event: string): void {
    console.log(event);
  }
}
