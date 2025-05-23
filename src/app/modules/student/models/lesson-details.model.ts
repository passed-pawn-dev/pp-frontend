import { Example } from './example.model';
import { Exercise } from './exercise.model';
import { Video } from './video.model';

export interface LessonDetails {
  id: string;
  lessonNumber: number;
  video: Video;
  exercises: Exercise[];
  examples: Example[];
}
