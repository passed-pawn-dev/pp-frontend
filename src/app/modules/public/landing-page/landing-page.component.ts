import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { JwtDecoded } from '../../student/models/JwtDecoded';
import { jwtDecode } from 'jwt-decode';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { QuestionTileComponent } from '../question-tile/question-tile.component';

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
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  protected logIn(): void {
    this.authService.redirectToLoginPage();
  }

  public async ngOnInit(): Promise<void> {
    const token = await this.authService.getToken();
    if (token && this.authService.isLoggedIn()) {
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
