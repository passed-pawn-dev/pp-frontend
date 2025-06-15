import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CourseVideoElementViewRequestDto } from '../models/course-video-element-view-request-dto.model';
import { CourseExampleDto } from '../models/course-example-dto.model';
import { Puzzle } from '../models/puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private httpClient = inject(HttpClient);

  public getVideoById(id: string): Observable<CourseVideoElementViewRequestDto> {
    return this.httpClient.get<CourseVideoElementViewRequestDto>(
      `/api/CourseVideo/${id}`
    );
  }

  public getExampleById(id: string): Observable<CourseExampleDto> {
    return this.httpClient.get<CourseExampleDto>(`/api/CourseExample/${id}`);
  }

  public getPuzzleById(id: string): Observable<Puzzle> {
    return this.httpClient.get<Puzzle>(`/api/CoursePuzzle/${id}`);
  }
}
