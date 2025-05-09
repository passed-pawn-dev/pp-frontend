import { CourseDifficulty } from '../../shared/enums/course-difficulty.enum';

export interface Course {
  id: string;
  title: string;
  description: string;
  eloRangeStart: number;
  eloRangeEnd: number;
  coachName: string;
  pictureUrl: string;
  price: number;
  averageScore: number;
}
