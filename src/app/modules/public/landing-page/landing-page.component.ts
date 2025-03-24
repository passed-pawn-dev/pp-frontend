import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { JwtDecoded } from '../../shared/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';
import Keycloak from 'keycloak-js';
import { QuestionTileComponent } from '../question-tile/question-tile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    NavbarComponent,
    FooterComponent,
    QuestionTileComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  public constructor(
    private readonly router: Router,
    private readonly keycloak: Keycloak,
  ) {}

  protected logIn(): void {
    this.keycloak.login()
  }

  public async ngOnInit(): Promise<void> {
    const token = this.keycloak.token
    if (token && this.keycloak.authenticated) {
      const decoded: JwtDecoded = jwtDecode(token);
      const roles: string[] | undefined = decoded.resource_access['api-client']?.roles;
      if (roles?.includes('student')) {
        this.router.navigate(['/student']);
      } else if (roles?.includes('coach')) {
        this.router.navigate(['/coach']);
      }
    }
  }
}
