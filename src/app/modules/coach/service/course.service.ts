import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';
import { CourseDetails } from '../models/CourseDetails';
import { NewCourse } from '../models/NewCourse';
import { Lesson } from '../models/Lesson';
import { NewLesson } from '../models/NewLesson';
import { LessonDetails } from '../../student/models/LessonDetails';
import { Exercise } from '../models/Exercise';
import { CourseLessons } from '../models/CourseLessons';
import { QuizDetails } from '../../student/models/QuizDetails';
import { CourseReview } from '../models/CourseReview';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('/api/Course/Coach');
  }

  public getById(id: string): Observable<CourseDetails> {
    return this.httpClient.get<CourseDetails>(`/api/Course/Coach/${id}`);
  }

  public getReviewsById(id: string): Observable<CourseReview[]> {
    return this.httpClient.get<CourseReview[]>(`/api/Course/${id}/review`);
  }

  public getLessonsById(id: string): Observable<LessonDetails[]> {
    return this.httpClient.get<LessonDetails[]>(`/api/Course/${id}/lesson`);
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

  public deleteLesson(id: string): Observable<object> {
    return this.httpClient.delete(`api/Lesson/${id}`);
  }

  public getExerciseById(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`api/CourseExercise/${id}`);
  }

  public addExercise(
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

  public addQuiz(lessonId: string, quiz: QuizDetails): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${lessonId}/quiz`, quiz);
  }
}
