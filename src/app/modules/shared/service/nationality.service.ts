import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nationality } from '../models/Nationality';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  public constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Nationality[]> {
    return this.httpClient.get<Nationality[]>('/api/Nationality', {
      responseType: 'json'
    });
  }
}
