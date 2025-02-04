import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../models/Coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  public constructor(private httpClient: HttpClient) {}

  public register(body: Coach): Observable<Coach> {
    return this.httpClient.post<Coach>('/api/Coach/register', body);
  }
}
