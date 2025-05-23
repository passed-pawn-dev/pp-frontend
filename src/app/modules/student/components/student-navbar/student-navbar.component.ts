import { Component, OnInit, inject } from '@angular/core';
import { NAV_LINKS } from '../../constants/nav-links';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/nav-link.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss'
})
export class StudentNavbarComponent implements OnInit {
  protected authService = inject(AuthService);

  protected navLinks: NavLink[] = NAV_LINKS;

  protected userName!: string;

  public ngOnInit(): void {
    this.authService.getUsername().then((res) => {
      this.userName = res;
    });
  }

  protected logOut(): void {
    this.authService.logout();
  }
}
