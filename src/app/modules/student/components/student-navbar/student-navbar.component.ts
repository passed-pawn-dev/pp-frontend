import { Component } from '@angular/core';
import { NAV_LINKS } from '../../constants/nav-links';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/NavLink';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss'
})
export class StudentNavbarComponent {
  protected navLinks: NavLink[] = NAV_LINKS;
}
