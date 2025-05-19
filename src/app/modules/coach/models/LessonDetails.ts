import { Example } from '../../student/models/Example';
import { Quiz } from '../../student/models/Quiz';
import { Video } from '../../student/models/Video';
import { Puzzle } from './Puzzle';

export interface LessonDetails {
  id: string;
  title: string;
  lessonNumber?: number;
  videos: Video[];
  puzzles: Puzzle[];
  examples: Example[];
  quizzes: Quiz[];
}
