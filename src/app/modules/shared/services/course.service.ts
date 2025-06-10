import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CourseVideoElementViewRequestDto } from '../models/course-video-element-view-request-dto.model';
import { CourseExampleDto } from '../models/course-example-dto.model';

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
}
