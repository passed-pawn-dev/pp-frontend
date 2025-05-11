import { Example } from './Example';
import { Exercise } from './Exercise';
import { Quiz } from './Quiz';

// Change to lesson object with list of all elemenets
export interface Lesson {
  id: string;
  title: string;
  lessonNumber: number;
  puzzles: Exercise[];
  examples: Example[];
  preview: boolean;
  quizzes: Quiz[];
  // video:
}
