import { Component, OnInit, inject } from '@angular/core';
import { NavLink } from '../../../student/models/NavLink';
import { RouterLink } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-coach-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coach-navbar.component.html',
  styleUrl: './coach-navbar.component.scss'
})
export class CoachNavbarComponent implements OnInit {
  protected keycloak = inject(Keycloak);

  protected navLinks: NavLink[] = [
    {
      name: 'My Courses',
      path: 'courses'
    },
  ];

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
