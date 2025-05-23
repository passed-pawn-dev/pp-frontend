import { Lesson } from './lesson.model';

export interface MyCourseDetails {
  id: string;
  title: string;
  description: string;
  coachName: string;
  thumbnailUrl?: string;
  lessons: Lesson[];
}
