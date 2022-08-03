import { MovementHelper } from "../helpers/movement";
import { Piece } from "../piece";
import { Square } from "../square";

export class Bishop extends Piece {
  shortName = "B";
  name = "Bishop";
  value = 3;

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;

    // check if bishop can be moved diagonally
    if (MovementHelper.canMoveDiagonally(board, start, end)) return true;

    return false;
  }
}
