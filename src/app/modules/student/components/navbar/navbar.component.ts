import { Component } from '@angular/core';
import { NAV_LINKS } from '../../constants/nav-links';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/NavLink';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected navLinks: NavLink[] = NAV_LINKS;
}
