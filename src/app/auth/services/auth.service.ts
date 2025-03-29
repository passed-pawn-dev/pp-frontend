// import { Injectable } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';
// import { environment } from '../../../../environment/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private constructor(private readonly keycloakService: KeycloakService) {}

//   public get userName(): string {
//     return this.keycloakService.getUsername();
//   }

//   public redirectToLoginPage(): Promise<void> {
//     return this.keycloakService.login();
//   }

//   public isLoggedIn(): boolean {
//     return this.keycloakService.isLoggedIn();
//   }

//   public logout(): void {
//     this.keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
//   }

//   public getToken(): Promise<string> {
//     return this.keycloakService.getToken();
//   }

//   public getUsername(): string {
//     return this.keycloakService.getUsername();
//   }

//   public isStudent(): boolean {
//     return this.keycloakService.isUserInRole('student');
//   }

//   public isCoach(): boolean {
//     return this.keycloakService.isUserInRole('coach');
//   }
// }
