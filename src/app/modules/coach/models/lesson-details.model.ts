import { Example } from '../../student/models/example.model';
import { Quiz } from '../../student/models/quiz.model';
import { Video } from '../../student/models/video.model';
import { Puzzle } from '../../shared/models/puzzle.model';

export interface LessonDetails {
  id: string;
  title: string;
  lessonNumber?: number;
  preview: boolean;
  videos: Video[];
  puzzles: Puzzle[];
  examples: Example[];
  quizzes: Quiz[];
}
