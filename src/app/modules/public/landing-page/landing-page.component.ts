import { Component } from '@angular/core';
import { PuzzleChessboardComponent } from '../../shared/components/puzzle-chessboard/puzzle-chessboard.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [PuzzleChessboardComponent, PuzzleChessboardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {}
