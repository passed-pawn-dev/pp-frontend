import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CourseVideoElementViewRequestDto } from '../models/course-video-element-view-request-dto.model';

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
}
