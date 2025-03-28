import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-student-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './student-my-profile.component.html',
  styleUrl: './student-my-profile.component.scss'
})
export class StudentMyProfileComponent {
  public constructor(private readonly authService: AuthService) {}

  protected logOut(): void {
    this.authService.logout();
  }
}
