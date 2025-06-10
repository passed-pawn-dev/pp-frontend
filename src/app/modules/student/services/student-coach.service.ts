import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoachProfile } from '../models/coach-profile.model';

@Injectable({
  providedIn: 'root'
})
export class StudentCoachService {
  public constructor(private httpClient: HttpClient) {}

  public getProfile(id: string): Observable<CoachProfile> {
    return this.httpClient.get<CoachProfile>(`api/Coach/${id}/profile`);
  }
}
