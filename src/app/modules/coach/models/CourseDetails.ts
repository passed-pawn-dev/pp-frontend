import { CourseReview } from './CourseReview';
import { Lesson } from './Lesson';

export interface CourseDetails {
  id: string;
  title: string;
  averageScore: number;
  description: string;
  enrolledStudentsCount: number;
  price: number;
  reviews: CourseReview[];
  lessons: [];
}
