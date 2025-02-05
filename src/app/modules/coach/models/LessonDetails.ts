import { Example } from '../../student/models/Example';
import { Video } from '../../student/models/Video';
import { Exercise } from './Exercise';

export interface LessonDetails {
  id: string;
  lessonNumber: number;
  video: Video;
  exercises: Exercise[];
  examples: Example[];
}
