import { CourseDifficulty } from '../../shared/enums/course-difficulty.enum';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  coachName: string;
  thumbnail: string;
  price: number;
  reviewScore: number;
}
