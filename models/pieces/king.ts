import { Piece } from "../piece";
import { Square } from "../square";

export class King extends Piece {
  shortName = "K";
  name = "King";
  value = Infinity;

  isCastlingDone = false;

  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;

    // allow castling move
    if (this.isCastlingMove(board, start, end)) return true;

    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    const isXAvailable = endX >= startX - 1 && endX <= startX + 1;
    const isYAvailable = endY >= startY - 1 && endY <= startY + 1;

    // allow king move in [-1, 1] square
    if (isXAvailable && isYAvailable) return true;

    return false;
  }

  setCastlingDone(isCastlingDone: boolean): void {
    this.isCastlingDone = isCastlingDone;
  }

  isCastlingMove(board: Square[][], start: Square, end: Square): boolean {
    if (this.isCastlingDone) {
      return false;
    }

    // TODO: castling move check

    return false;
  }
}
