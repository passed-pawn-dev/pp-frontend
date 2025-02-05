import { Excercise } from './Excercise';

export interface Lesson {
  id: string | null;
  video: null;
  lessonNumber: number | null;
  excersises: Excercise[];
}
