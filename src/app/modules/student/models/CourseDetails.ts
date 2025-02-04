import { CourseReview } from './CourseReview';
import { Lesson } from './Lesson';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  lessonNumber: number;
  studentNumber: number;
  reviews: CourseReview[];
}
