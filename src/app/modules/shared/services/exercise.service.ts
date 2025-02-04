import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private httpClient = inject(HttpClient);
  // public saveExercise(fenBoard: string, algebraicNotationMoveList: string) {
  //   // this.httpClient.post(`localhost:8080/api/Lesson/${}/exercise`);
  // }
}
