import { Component, inject } from '@angular/core';
import { NAV_LINKS } from '../../constants/nav-links';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/NavLink';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss'
})
export class StudentNavbarComponent {
  protected authService = inject(AuthService);

  protected navLinks: NavLink[] = NAV_LINKS;

  protected userName: string = this.authService.getUsername();

  protected logOut(): void {
    this.authService.logout();
  }
}
