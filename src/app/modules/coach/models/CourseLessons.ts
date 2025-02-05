import { LessonDetails } from './LessonDetails';

// TODO - TEMPORARY SOLUTION
export interface CourseLessons {
  id: string;
  title: string;
  description: string;
  lessons: LessonDetails[];
}
