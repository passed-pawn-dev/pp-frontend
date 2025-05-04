import { ChessTitle } from '../../shared/enums/chess-titles.enum';

export interface Coach {
  name: string;
  chessTitle: ChessTitle;
  createdCoursesCount: number;
  description: string;
  pictureUrl: string;
}
