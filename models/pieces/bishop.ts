import { Piece } from "../piece";
import { Square } from "../square";

export class Bishop extends Piece {
  shortName = "B";
  name = "Bishop";
  value = 3;

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;

    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    const isLeftSided = startX + startY === endX + endY;
    const isRightSided = startX - startY === endX - endY;

    // verify if end square is on the same diagonal
    if (startX !== endX && startY !== endY && (isLeftSided || isRightSided))
      return true;

    return false;
  }
}
