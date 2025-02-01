import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public constructor(private httpClient: HttpClient) {}

  public register(body: Student): Observable<Student> {
    return this.httpClient.post<Student>('/api/Student/register', body);
  }
}
