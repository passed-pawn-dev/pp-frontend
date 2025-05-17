import { Coach } from './Coach';
import { CourseReview } from './CourseReview';
import { Lesson } from './Lesson';

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
  pictureUrl: null;
  price: number;
  studentNumber: number;
  isBought: boolean;
}
