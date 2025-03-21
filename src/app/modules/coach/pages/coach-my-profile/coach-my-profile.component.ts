import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-coach-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './coach-my-profile.component.html',
  styleUrl: './coach-my-profile.component.scss'
})
export class CoachMyProfileComponent {
  public constructor(private readonly keycloak: Keycloak) {}

  protected logOut(): void {
    this.keycloak.logout();
  }
}
