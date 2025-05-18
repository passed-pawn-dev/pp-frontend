import { Lesson } from './Lesson';

export interface MyCourseDetails {
  id: string;
  title: string;
  description: string;
  coachName: string;
  thumbnailUrl?: string;
  lessons: Lesson[];
}
