import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LessonDetails } from '../models/LessonDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  public constructor(private httpClient: HttpClient) {}

  public getById(id: string): Observable<LessonDetails> {
    return this.httpClient.get<LessonDetails>(`/api/Lesson/${id}`);
  }
}
