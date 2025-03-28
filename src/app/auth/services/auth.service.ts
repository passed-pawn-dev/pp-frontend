import Keycloak from 'keycloak-js';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private constructor(private readonly keycloak: Keycloak) {}

  public redirectToLoginPage(promptLogIn: boolean = true): Promise<void> {
    if (promptLogIn) {
      return this.keycloak.login({
        prompt: 'login'
      });
    } else {
      return this.keycloak.login();
    }
  }

  public isLoggedIn(): boolean | undefined {
    return this.keycloak.authenticated;
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public getToken(): string | undefined {
    return this.keycloak.token;
  }

  public getUsername(): Promise<string> {
    return this.keycloak.loadUserProfile().then((res) => res.username!);
  }
}
