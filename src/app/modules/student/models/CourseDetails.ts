import { CourseReview } from './CourseReview';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  coachName: string;
  thumbnail: string;
  price: number;
  lessons: number;
  reviewScore: number;
  reviews: CourseReview[];
}
