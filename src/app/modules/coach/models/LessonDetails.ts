import { Example } from '../../student/models/Example';
import { Quiz } from '../../student/models/Quiz';
import { Video } from '../../student/models/Video';
import { Exercise } from './Exercise';

export interface LessonDetails {
  id: string;
  lessonNumber: number;
  videos: Video[];
  exercises: Exercise[];
  examples: Example[];
  quizzes: Quiz[];
}
