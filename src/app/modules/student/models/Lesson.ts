import { Exercise } from './Exercise';

// Change to lesson object with list of all elemenets
export interface Lesson {
  id: string;
  lessonNumber: number;
  exercises: Exercise[];
}
