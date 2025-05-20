import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';
import { CourseDetails } from '../models/CourseDetails';
import { NewCourse } from '../models/NewCourse';
import { Lesson } from '../models/Lesson';
import { NewLesson } from '../models/NewLesson';
import { LessonDetails } from '../../student/models/LessonDetails';
import { Puzzle } from '../models/Puzzle';
import { QuizDetails } from '../../student/models/QuizDetails';
import { CourseReview } from '../models/CourseReview';
import { ElementKind } from '../../shared/enums/element-kind.enum';
import { NewExample } from '../models/NewExample';

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
    return this.httpClient.get<LessonDetails[]>(`/api/Course/Coach/${id}/lesson`);
  }

  public create(course: NewCourse): Observable<Course> {
    return this.httpClient.post<Course>('/api/Course/Coach', course);
  }

  public update(id: string, course: NewCourse): Observable<Course> {
    return this.httpClient.put<Course>(`/api/Course/Coach/${id}`, course);
  }

  public delete(id: string): Observable<string> {
    return this.httpClient.delete(`/api/Course/Coach/${id}`, {
      responseType: 'text'
    });
  }

  public addLesson(id: string, lesson: NewLesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(`api/Course/Coach/${id}/lesson`, lesson);
  }

  public deleteLesson(id: string): Observable<object> {
    return this.httpClient.delete(`api/Lesson/${id}`);
  }

  public deleteElement(id: string, kind: ElementKind): Observable<object> {
    switch (kind) {
      case ElementKind.Quiz:
        return this.deleteQuiz(id);
      case ElementKind.Example:
        return this.deleteExample(id);
      case ElementKind.Puzzle:
        return this.deletePuzzle(id);
      case ElementKind.Video:
        return this.deleteVideo(id);
    }
  }

  public deleteQuiz(id: string): Observable<object> {
    return this.httpClient.delete(`api/CourseQuiz/${id}`);
  }
  public deleteExample(id: string): Observable<object> {
    return this.httpClient.delete(`api/CourseExample/${id}`);
  }
  public deleteVideo(id: string): Observable<object> {
    return this.httpClient.delete(`api/CourseVideo/${id}`);
  }
  public deletePuzzle(id: string): Observable<object> {
    return this.httpClient.delete(`api/CoursePuzzle/${id}`);
  }

  public getExerciseById(id: string): Observable<Puzzle> {
    return this.httpClient.get<Puzzle>(`api/CoursePuzzle/${id}`);
  }

  public addPuzzle(
    lessonId: string,
    title: string,
    description: string,
    fen: string,
    solution: string
  ): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${lessonId}/puzzle`, {
      title,
      description,
      fen,
      solution,
      order: 1
    });
  }

  public addQuiz(lessonId: string, quiz: QuizDetails): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${lessonId}/quiz`, quiz);
  }

  public addExample(lessonId: string, example: NewExample): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${lessonId}/example`, example);
  }

  public addVideo(courseId: string, payload: FormData): Observable<Object> {
    return this.httpClient.post(`api/Lesson/${courseId}/video`, payload);
  }

  public updateThumbnail(courseId: string, thumbnail: FormData): Observable<Object> {
    return this.httpClient.patch(`api/Course/Coach/${courseId}/thumbnail`, thumbnail);
  }

  public deleteThumbnail(courseId: string): Observable<Object> {
    return this.httpClient.delete(`api/Course/Coach/${courseId}/thumbnail`);
  }
}
