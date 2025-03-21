import { Component, OnInit, inject } from '@angular/core';
import { NAV_LINKS } from '../../constants/nav-links';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/NavLink';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss'
})
export class StudentNavbarComponent implements OnInit {
  protected keycloak = inject(Keycloak);

  protected navLinks: NavLink[] = NAV_LINKS;

  protected userName!: string;

  public ngOnInit(): void {
    this.keycloak.loadUserProfile().then(res => {
      this.userName = res.username!;
    });
  }

  protected logOut(): void {
    this.keycloak.logout();
  }
}
