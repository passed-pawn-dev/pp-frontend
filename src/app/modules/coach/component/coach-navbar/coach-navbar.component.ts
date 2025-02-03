import { Component } from '@angular/core';
import { NavLink } from '../../../student/models/NavLink';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coach-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-navbar.component.html',
  styleUrl: './coach-navbar.component.scss'
})
export class CoachNavbarComponent {
  protected navLinks: NavLink[] = [
    {
      name: 'My Courses',
      path: 'courses'
    },
    {
      name: 'My profile',
      path: 'profile'
    }
  ];
}
