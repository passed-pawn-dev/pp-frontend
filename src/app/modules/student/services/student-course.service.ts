import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyCourse } from '../models/my-course.model';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseDetails } from '../models/course-details.model';
import { Lesson } from '../models/lesson.model';
import { MyCourseDetails } from '../models/my-course-details.model';
import { CourseReview } from '../models/course-review.model';
import { NewCourseReview } from '../models/new-course-review.model';
import { Exercise } from '../models/exercise.model';
import { QuizDetails } from '../models/quiz-details.model';
import { ExampleDetails } from '../models/example-details.model';
import { CoursesQueryParams } from '../models/course-query-params.model';
import { StudentVideoElementRequestDto } from '../models/student-video-element-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
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

  public acquireFreeCourse(id: string): Observable<Object> {
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

  public updateReview(id: string, review: NewCourseReview): Observable<CourseReview> {
    return this.httpClient.put<CourseReview>(`/api/CourseReview/${id}`, review);
  }

  public deleteReview(id: string): Observable<Object> {
    return this.httpClient.delete(`/api/CourseReview/${id}`);
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

  public getVideoById(id: string): Observable<StudentVideoElementRequestDto> {
    return this.httpClient.get<StudentVideoElementRequestDto>(`/api/CourseVideo/${id}`);
  }
}
