import { Component, inject } from '@angular/core';
import { PuzzleChessboardComponent } from '../../../shared/components/puzzle-chessboard/puzzle-chessboard.component';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-student-solve-exercise',
  standalone: true,
  imports: [PuzzleChessboardComponent],
  templateUrl: './student-solve-exercise.component.html',
  styleUrl: './student-solve-exercise.component.scss'
})
export class StudentSolveExerciseComponent {
  private courseService = inject(CourseService);

  public ngOnInit() {}
}
