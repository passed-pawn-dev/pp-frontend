import { Component } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public constructor(private readonly keycloak: Keycloak,) {}

  protected logIn(): void {
    this.keycloak.login()
  }
}
