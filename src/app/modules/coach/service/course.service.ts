import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';
import { CourseDetails } from '../models/CourseDetails';
import { NewCourse } from '../models/NewCourse';
import { Lesson } from '../models/Lesson';
import { NewLesson } from '../models/NewLesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('/api/Course/created');
  }

  public getById(id: string): Observable<CourseDetails> {
    return this.httpClient.get<CourseDetails>(`/api/Course/${id}`);
  }

  public create(course: NewCourse): Observable<Course> {
    return this.httpClient.post<Course>('/api/Course', course);
  }

  public update(id: string, course: NewCourse): Observable<Course> {
    return this.httpClient.put<Course>(`/api/Course/${id}`, course);
  }

  public delete(id: string): Observable<string> {
    return this.httpClient.delete(`/api/Course/${id}`, {
      responseType: 'text'
    });
  }

  public addLesson(id: string, lesson: NewLesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(`api/Course/${id}/lesson`, lesson);
  }

  public addPuzzle(
    lessonId: string,
    title: string,
    description: string,
    fen: string,
    solution: string
  ): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${lessonId}/exercise`, {
      title,
      description,
      fen,
      solution
    });
  }
}
