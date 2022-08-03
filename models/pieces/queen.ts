import { MovementHelper } from "../helpers/movement";
import { Piece } from "../piece";
import { Square } from "../square";

export class Queen extends Piece {
  shortName = "Q";
  name = "Queen";
  value = 9;

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;
    // verify if piece can be moved horizontally
    if (MovementHelper.canMoveHorizontally(board, start, end)) return true;
    // verify if piece can be moved vertically
    if (MovementHelper.canMoveVertically(board, start, end)) return true;
    // verify if piece can be moved diagonally
    if (MovementHelper.canMoveDiagonally(board, start, end)) return true;

    return false;
  }
}
