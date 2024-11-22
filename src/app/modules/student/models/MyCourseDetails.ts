import { Lesson } from './Lesson';

export interface MyCourseDetails {
  id: string;
  title: string;
  description: string;
  coachName: string;
  thumbnail: string;
  lessons: Lesson[];
}
