import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseDetails } from '../models/course-details.model';
import { NewCourse } from '../models/new-course.model';
import { NewLesson } from '../models/new-lesson.model';
import { LessonDetails } from '../models/lesson-details.model';
import { Puzzle } from '../../shared/models/puzzle.model';
import { QuizDetails } from '../../shared/models/quiz-details.model';
import { CourseReview } from '../models/course-review.model';
import { ElementKind } from '../../shared/enums/element-kind.enum';
import { CoachExampleUpsertDto } from '../models/new-example.model';
import { CloudinarySecureUrlResponse } from '../../shared/models/cloudinary-secure-url-response';
import { AddVideoRequestPayload } from '../models/add-video-request-payload.model';
import { UpdateThumbnailPayload } from '../models/update-thumbnail-payload.model';

@Injectable({
  providedIn: 'root'
})
export class CoachCourseService {
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

  public addLesson(id: string, lesson: NewLesson): Observable<LessonDetails> {
    return this.httpClient.post<LessonDetails>(
      `/api/Course/Coach/${id}/lesson`,
      lesson
    );
  }

  public deleteLesson(id: string): Observable<object> {
    return this.httpClient.delete(`/api/Lesson/${id}`);
  }

  public editLesson(id: string, lesson: NewLesson): Observable<LessonDetails> {
    return this.httpClient.put<LessonDetails>(`/api/Lesson/${id}`, lesson);
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
    return this.httpClient.delete(`/api/CourseQuiz/${id}`);
  }
  public deleteExample(id: string): Observable<object> {
    return this.httpClient.delete(`/api/CourseExample/${id}`);
  }
  public deleteVideo(id: string): Observable<object> {
    return this.httpClient.delete(`/api/CourseVideo/${id}`);
  }
  public deletePuzzle(id: string): Observable<object> {
    return this.httpClient.delete(`/api/CoursePuzzle/${id}`);
  }

  public getExerciseById(id: string): Observable<Puzzle> {
    return this.httpClient.get<Puzzle>(`/api/CoursePuzzle/${id}`);
  }

  public addPuzzle(
    lessonId: string,
    title: string,
    description: string,
    fen: string,
    solution: string
  ): Observable<Object> {
    return this.httpClient.post(`/api/Lesson/${lessonId}/puzzle`, {
      title,
      description,
      fen,
      solution,
      order: 1
    });
  }

  public editPuzzle(
    puzzleId: string,
    title: string,
    description: string,
    fen: string,
    solution: string,
    order: number
  ): Observable<Object> {
    return this.httpClient.put(`/api/CoursePuzzle/${puzzleId}`, {
      title,
      description,
      fen,
      solution,
      order
    });
  }

  public addQuiz(lessonId: string, quiz: QuizDetails): Observable<Object> {
    return this.httpClient.post(`/api/Lesson/${lessonId}/quiz`, quiz);
  }

  public editQuiz(quizId: string, quiz: QuizDetails): Observable<Object> {
    return this.httpClient.put(`/api/CourseQuiz/${quizId}`, quiz);
  }

  public addExample(
    lessonId: string,
    example: CoachExampleUpsertDto
  ): Observable<Object> {
    return this.httpClient.post(`/api/Lesson/${lessonId}/example`, example);
  }

  public editExample(
    lessonId: string,
    example: CoachExampleUpsertDto
  ): Observable<Object> {
    return this.httpClient.put(`/api/CourseExample/${lessonId}`, example);
  }

  public addVideo(
    courseId: string,
    payload: AddVideoRequestPayload
  ): Observable<Object> {
    return this.httpClient.post(`/api/Lesson/${courseId}/video`, payload);
  }

  public editVideo(
    videoElementId: string,
    payload: AddVideoRequestPayload
  ): Observable<Object> {
    return this.httpClient.put(`/api/CourseVideo/${videoElementId}`, payload);
  }

  public getVideoUploadSignature(): Observable<CloudinarySecureUrlResponse> {
    return this.httpClient.get<CloudinarySecureUrlResponse>(
      `/api/CourseVideo/upload-signature`
    );
  }

  public getCourseThumbnailUploadSignature(): Observable<CloudinarySecureUrlResponse> {
    return this.httpClient.get<CloudinarySecureUrlResponse>(
      `/api/Course/Coach/thumbnail/signature`
    );
  }

  public updateThumbnail(
    courseId: string,
    payload: UpdateThumbnailPayload
  ): Observable<Object> {
    return this.httpClient.patch(`/api/Course/Coach/${courseId}/thumbnail`, payload);
  }

  public deleteThumbnail(courseId: string): Observable<Object> {
    return this.httpClient.delete(`/api/Course/Coach/${courseId}/thumbnail`);
  }

  public getLessonCount(courseId: string): Observable<number> {
    return this.httpClient
      .get<{ lessonCount: number }>(`/api/Course/Coach/${courseId}/lesson-count`)
      .pipe(map((response) => response.lessonCount));
  }
}
