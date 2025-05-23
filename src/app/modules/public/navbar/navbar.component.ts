import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public constructor(private readonly authService: AuthService) {}

  protected logIn(): void {
    this.authService.redirectToLoginPage();
  }
}
