import { Puzzle } from './Puzzle';

export interface Lesson {
  id: string | null;
  video: null;
  lessonNumber: number | null;
  excersises: Puzzle[];
}
