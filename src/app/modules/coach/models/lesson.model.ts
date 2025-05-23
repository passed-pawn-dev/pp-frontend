import { Puzzle } from './puzzle.model';

export interface Lesson {
  id: string | null;
  video: null;
  lessonNumber: number | null;
  excersises: Puzzle[];
}
