import { Puzzle } from './Puzzle';

export interface NewLesson {
  lessonNumber: number | null;
  puzzles: Puzzle[];
}
