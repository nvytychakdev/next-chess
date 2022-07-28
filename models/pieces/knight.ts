import { Piece } from "../piece";
import { Square } from "../square";

export class Knight extends Piece {
  shortName = "N";
  name = "Knight";
  value = 3;

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;

    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    const x = Math.abs(startX - endX);
    const y = Math.abs(startY - endY);

    // allow knight to move in case if move value is 2
    if (x * y === 2) return true;

    return false;
  }
}
