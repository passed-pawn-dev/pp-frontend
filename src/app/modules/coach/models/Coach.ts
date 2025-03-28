export interface Coach {
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
  nationalityId: string | null;
  detailedDescription: string | null;
  shortDescription: string | null;
}
