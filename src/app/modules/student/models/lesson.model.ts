import { Puzzle } from '../../shared/models/puzzle.model';
import { Example } from './example.model';
import { Quiz } from './quiz.model';
import { Video } from './video.model';

// Change to lesson object with list of all elemenets
export interface Lesson {
  id: string;
  title: string;
  lessonNumber: number;
  puzzles: Puzzle[];
  examples: Example[];
  preview: boolean;
  quizzes: Quiz[];
  videos: Video[];
}
