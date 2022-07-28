import { Piece } from "../piece";
import { Square } from "../square";

export class Pawn extends Piece {
  shortName = "P";
  name = "Pawn";
  value = 1;
  isFirstMove = true;

  setFirstMove(isFirstMove: boolean): void {
    this.isFirstMove = isFirstMove;
  }
  canMove(board: Square[][], start: Square, end: Square): boolean {
    const endPiece = end.getPiece();

    // verify if end square not taken by the piece of same side
    if (endPiece?.isWhite === this.isWhite) return false;

    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    // verify forward square
    const isSameRow = endX === startX;
    const moveSide = this.isWhite ? 1 : -1;
    const singleSquare = endY === startY + moveSide;
    if (!endPiece && isSameRow && singleSquare) return true;

    // two squares first move
    const twoSquares = endY === startY + moveSide * 2;
    if (this.isFirstMove && !endPiece && isSameRow && twoSquares) return true;

    // verify attact squares
    const isNbrSquare = endX === startX + 1 || endX === startX - 1;
    if (endPiece && singleSquare && isNbrSquare) return true;

    // TODO: verify en passant

    return false;
  }
}
