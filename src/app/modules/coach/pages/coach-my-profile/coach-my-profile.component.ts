import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-coach-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './coach-my-profile.component.html',
  styleUrl: './coach-my-profile.component.scss'
})
export class CoachMyProfileComponent {
  public constructor(private readonly authService: AuthService) {}

  protected logOut(): void {
    this.authService.logout();
  }
}
