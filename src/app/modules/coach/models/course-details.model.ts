import { CourseReview } from './course-review.model';

export interface CourseDetails {
  id: string;
  title: string;
  averageScore: number;
  description: string;
  enrolledStudentsCount: number;
  price: number;
  reviews: CourseReview[];
  lessons: [];
  thumbnailUrl: string | null;
}
