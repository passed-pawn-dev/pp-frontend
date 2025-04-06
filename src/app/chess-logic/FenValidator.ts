export class FenValidator {
  public static validateFEN(fen: string): { result: boolean; errors: string[] | null } {
    const fenParts = fen.trim().split(' ');
    const errors = [];

    if (fenParts.length !== 6) errors.push('FEN must have 6 parts seperated by spaces');

    const [position, turn, castling, enPassant, halfmove, fullmove] = fenParts;

    if (!this.validatePosition(position)) errors.push('Invalid board notation');

    // Validate turn field
    if (!/^w|b$/.test(turn)) errors.push("Active color must be either 'w' or 'b'");

    // Validate castling rights
    if (!/^(K?Q?k?q?|-)$/i.test(castling))
      errors.push("Castling rights must can contain only K, Q, k and q or be '-'");

    // Validate en passant square
    if (!/^([a-h][1-8]|-)$/.test(enPassant))
      errors.push("En passant must be valid field or '-'");

    // Validate halfmove clock
    if (!/^\d+$/.test(halfmove)) errors.push('Invalid half move clock');

    // Validate fullmove number
    if (!/^[1-9]\d*$/.test(fullmove)) errors.push('Invalid full move number');

    return errors.length === 0
      ? { result: true, errors: null }
      : { result: false, errors: errors };
  }

  private static validatePosition(position: string): boolean {
    const ranks = position.split('/');

    if (ranks.length !== 8) return false;

    for (const rank of ranks) {
      let squareCount = 0;

      for (const char of rank) {
        if (/[1-8]/.test(char)) {
          squareCount += parseInt(char);
        } else if (/[prnbqkPRNBQK]/.test(char)) {
          squareCount += 1;
        } else {
          return false;
        }
      }
      if (squareCount !== 8) return false;
    }

    return true;
  }
}
