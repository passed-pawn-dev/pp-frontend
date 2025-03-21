import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-student-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './student-my-profile.component.html',
  styleUrl: './student-my-profile.component.scss'
})
export class StudentMyProfileComponent {
  public constructor(private readonly keycloak: Keycloak) {}

  protected logOut(): void {
    this.keycloak.logout();
  }
}
