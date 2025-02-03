import { Component } from '@angular/core';
import { PuzzleChessboardComponent } from '../../shared/components/puzzle-chessboard/puzzle-chessboard.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [PuzzleChessboardComponent, PuzzleChessboardComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  public constructor(private readonly authService: AuthService) {}

  protected logIn(): void {
    this.authService.redirectToLoginPage();
  }
}
