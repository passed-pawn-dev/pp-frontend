import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private httpClient = inject(HttpClient);
  public askQuestion(question: string): Observable<Answer> {
    return this.httpClient.post<Answer>('http://localhost:8000/ask', {
      question: question
    });
  }
}
