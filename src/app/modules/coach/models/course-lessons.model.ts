import { LessonDetails } from './lesson-details.model';

// TODO - TEMPORARY SOLUTION
export interface CourseLessons {
  id: string;
  title: string;
  description: string;
  lessons: LessonDetails[];
}
