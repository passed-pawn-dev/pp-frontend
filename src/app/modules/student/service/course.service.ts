import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyCourse } from '../models/MyCourse';
import { map, Observable } from 'rxjs';
import { Course } from '../models/Course';
import { CourseDetails } from '../models/CourseDetails';
import { Lesson } from '../models/Lesson';
import { MyCourseDetails } from '../models/MyCourseDetails';
import { CourseReview } from '../models/CourseReview';
import { NewCourseReview } from '../models/NewCourseReview';
import { Exercise } from '../models/Exercise';
import { QuizDetails } from '../models/QuizDetails';
import { ExampleDetails } from '../models/ExampleDetails';
import { CoursesQueryParams } from '../models/CoursesQueryParams';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public constructor(private httpClient: HttpClient) {}

  public getAll(coursesParams: CoursesQueryParams): Observable<HttpResponse<Course[]>> {
    let params = new HttpParams();
    Object.entries(coursesParams).forEach(([key, value]) => {
      if (value != null) {
        params = params.set(key, value);
      }
    });

    return this.httpClient.get<Course[]>('/api/Course/Student', {
      params,
      observe: 'response'
    });
  }

  public getById(id: string): Observable<CourseDetails> {
    return this.httpClient.get<CourseDetails>(`/api/Course/Student/${id}`);
  }

  public getReviews(id: string): Observable<CourseReview[]> {
    return this.httpClient.get<CourseReview[]>(`/api/Course/${id}/review`);
  }

  public buy(id: string): Observable<Object> {
    return this.httpClient.post(`/api/Course/Student/${id}/course-list`, {});
  }

  public getPaymentIntent(id: string): Observable<string> {
    return this.httpClient
      .post<{ clientSecret: string }>(`/api/Course/Student/${id}/buy`, {})
      .pipe(map((response: { clientSecret: string }) => response.clientSecret));
  }

  public signOut(id: string): Observable<Object> {
    return this.httpClient.delete(`/api/Course/Student/${id}/course-list`);
  }

  public review(id: string, review: NewCourseReview): Observable<CourseReview> {
    return this.httpClient.post<CourseReview>(
      `/api/Course/Student/${id}/review`,
      review
    );
  }

  public getAllBought(): Observable<MyCourse[]> {
    return this.httpClient.get<MyCourse[]>('/api/Course/Student/bought');
  }

  public getBoughtById(id: string): Observable<MyCourseDetails> {
    return this.httpClient.get<MyCourseDetails>(`/api/Course/Student/${id}/bought`);
  }

  public getLessons(id: string): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(`/api/Course/Student/${id}/lessons`);
  }

  public getExerciseById(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`/api/CoursePuzzle/${id}`);
  }

  public getQuizById(id: string): Observable<QuizDetails> {
    return this.httpClient.get<QuizDetails>(`/api/CourseQuiz/${id}`);
  }

  public getExampleById(id: string): Observable<ExampleDetails> {
    return this.httpClient.get<ExampleDetails>(`/api/CourseExample/${id}`);
  }
}
