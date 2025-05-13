import { ChessTitle } from '../../shared/enums/chess-titles.enum';

export interface Coach {
  id: number;
  name: string;
  chessTitle: ChessTitle;
  createdCoursesCount: number;
  description: string;
  pictureUrl: string;
}
