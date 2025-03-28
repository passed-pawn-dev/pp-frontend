import { ChessTitle } from '../../shared/enums/chess-titles.enum';

export interface Student {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  elo: number | null;
  // chessTitle: ChessTitle | null,
  // chessTitle: number | null;
  nationalityId?: string | null;
}
