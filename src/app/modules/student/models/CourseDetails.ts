import { CourseReview } from './CourseReview';
import { Lesson } from './Lesson';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  lessons: Lesson[];
  reviews: CourseReview[];
}
