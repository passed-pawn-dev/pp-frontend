import { Exercise } from './Exercise';

export interface Lesson {
  id: string;
  lessonNumber: number;
  exercises: Exercise[];
}
