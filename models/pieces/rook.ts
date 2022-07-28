import { Piece } from "../piece";
import { Square } from "../square";

export class Rook extends Piece {
  shortName = "R";
  name = "Rook";
  value = 5;

  canMove(board: Square[][], start: Square, end: Square): boolean {
    // verify if end square not taken by the piece of same side
    if (end.getPiece()?.isWhite === this.isWhite) return false;

    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    // verify horizontal collisions with other pieces
    if (startX !== endX) {
      const betweenSquares = board[endY].filter(
        (s, i) => (i > startX && i < endX) || (i > endX && i < startX)
      );
      const squareWithPiece = betweenSquares.find((s) => !!s.getPiece());
      if (squareWithPiece) return false;
    }

    // verify vertical collision with other pieces
    if (startY !== endY) {
      const betweenSquares = board.reduce((acc, col, i) => {
        if ((i > startY && i < endY) || (i > endY && i < startY)) {
          acc.push(col[endX]);
        }

        return acc;
      }, []);
      const squareWithPiece = betweenSquares.find((s) => !!s.getPiece());
      if (squareWithPiece) return false;
    }

    // verify if end square is on the same line
    if (startX === endX || startY === endY) return true;

    return false;
  }
}
