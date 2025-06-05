import { Coach } from './coach.model';
import { Lesson } from './lesson.model';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  coach: Coach;
  puzzleCount: number;
  videoCount: number;
  quizCount: number;
  exampleCount: number;
  language: string;
  eloRangeStart: number;
  eloRangeEnd: number;
  totalVideoCount: number;
  reviewCount: number;
  averageScore: 0;
  thumbnailUrl: null;
  price: number;
  enrolledStudentsCount: number;
  isBought: boolean;
  lessons: Lesson[];
}
