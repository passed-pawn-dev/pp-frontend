import { Excercise } from './Excercise';

export interface NewLesson {
  lessonNumber: number | null;
  excercises: Excercise[];
}
