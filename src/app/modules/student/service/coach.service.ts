import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoachProfile } from '../models/CoachProfile';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  public constructor(private httpClient: HttpClient) {}

  public getProfile(id: string): Observable<CoachProfile> {
    return this.httpClient.get<CoachProfile>(`api/Coach/${id}/profile`);
  }
}
