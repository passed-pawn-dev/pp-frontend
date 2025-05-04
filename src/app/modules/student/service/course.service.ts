import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyCourse } from '../models/MyCourse';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';
import { CourseDetails } from '../models/CourseDetails';
import { Lesson } from '../models/Lesson';
import { MyCourseDetails } from '../models/MyCourseDetails';
import { CourseReview } from '../models/CourseReview';
import { NewCourseReview } from '../models/NewCourseReview';
import { Exercise } from '../models/Exercise';
import { QuizDetails } from '../models/QuizDetails';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('/api/Course/Student');
  }

  public getById(id: string): Observable<CourseDetails> {
    return this.httpClient.get<CourseDetails>(`/api/Course/Student/${id}`);
  }

  public buy(id: string): Observable<Object> {
    return this.httpClient.post(`/api/Course/Student/${id}/course-list`, {});
  }

  public signOut(id: string): Observable<Object> {
    return this.httpClient.delete(`/api/Course/Student/${id}/course-list`);
  }

  public review(id: string, review: NewCourseReview): Observable<CourseReview> {
    return this.httpClient.post<CourseReview>(`/api/Course/${id}/review`, review);
  }

  public getAllBought(): Observable<MyCourse[]> {
    return this.httpClient.get<MyCourse[]>('/api/Course/Student/bought');
  }

  public getBoughtById(id: string): Observable<MyCourseDetails> {
    return this.httpClient.get<MyCourseDetails>(`/api/Course/Student/${id}/bought`);
  }

  public getLessons(id: string): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(`/api/Course/${id}/lesson`);
  }

  public getExerciseById(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`/api/CourseExercise/${id}`);
  }

  public getQuizById(id: string): Observable<QuizDetails> {
    return this.httpClient.get<QuizDetails>(`/api/CourseQuiz/${id}`);
  }
}
