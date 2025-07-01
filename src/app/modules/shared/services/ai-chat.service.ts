import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';
import { AuthService } from '../../core/services/auth.service';
import { JwtDecoded } from '../models/jwt-decoded.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../../environment/environment.fullstack-local';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  public askQuestion(question: string): Observable<Answer> {
    let role = 'unregistered';
    const token = this.authService.getToken();

    if (token !== undefined) {
      const decoded: JwtDecoded = jwtDecode(token);
      const roles: string[] | undefined =
        decoded.resource_access[environment.keycloak.apiClientId].roles;

      if (roles && roles.includes('student')) {
        role = 'student';
      } else {
        role = 'coach';
      }
    }

    const params = new HttpParams().set('role', role);

    return this.httpClient.post<Answer>(
      '/ai/ask',
      {
        question: question
      },
      { params: params }
    );
  }
}
