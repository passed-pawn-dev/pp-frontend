import { Component, OnInit, inject } from '@angular/core';
import { NavLink } from '../../../student/models/NavLink';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-coach-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-navbar.component.html',
  styleUrl: './coach-navbar.component.scss'
})
export class CoachNavbarComponent implements OnInit {
  protected authService = inject(AuthService);

  protected navLinks: NavLink[] = [
    {
      name: 'My Courses',
      path: 'courses'
    }
  ];

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
