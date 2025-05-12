import { ChessTitle } from '../../shared/enums/chess-titles.enum';
import { Course } from './Course';

export interface CoachProfile {
  fullName: string;
  email: string;
  elo: number;
  chessTitle: ChessTitle | null;
  nationality: number | null;
  detailedDescription: string | null;
  shortDescription: string | null;
  photoUrl: string | null;
  courses: Course[];
}
