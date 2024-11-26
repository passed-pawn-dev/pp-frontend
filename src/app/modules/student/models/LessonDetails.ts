import { Example } from './Example';
import { Exercise } from './Exercise';
import { Video } from './Video';

export interface LessonDetails {
  id: string;
  lessonNumber: number;
  video: Video;
  exercises: Exercise[];
  examples: Example[];
}
