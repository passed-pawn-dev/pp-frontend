import { CourseReview } from './CourseReview';
import { Lesson } from './Lesson';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  studentNumber: number;
  lessonNumber: number;
  price: number;
  reviews: CourseReview[];
}
