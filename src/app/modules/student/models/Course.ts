import { CourseDifficulty } from '../../shared/enums/course-difficulty.enum';

export interface Course {
  id: string;
  title: string;
  description: string;
  eloRangeStart: number | null;
  eloRangeEnd: number | null;
  coachName: string;
  thumbnailUrl?: string;
  price: number;
  averageScore: number;
  isBought: boolean;
}
