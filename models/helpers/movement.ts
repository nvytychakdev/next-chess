import { Square } from "../square";

export class MovementHelper {
  /**
   * Check if the piece can be moved horizontally.
   *
   * Block any other types of movements and validate any collisions on the traveled distance
   * before moving the piece. Prevent piece movement for same square, unexpected direction or
   * if there is another piece on the way.
   *
   * @param board - current board reference
   * @param start - square of the movement start
   * @param end - target square for the movement
   * @returns is piece can be moved from start to end square
   */
  static canMoveHorizontally(
    board: Square[][],
    start: Square,
    end: Square
  ): boolean {
    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    // prevent movement to the same square
    if (startX === endX && startY === endY) return false;

    // prevent movement vertically
    if (startY !== endY) return false;

    // verify if there is no collision with other pieces on the board
    const distance = startX > endX ? startX - endX : endX - startX;
    const horizontalCoords = Array.from(Array(distance - 1), (item, index) => {
      const step = index + 1;
      const x = startX + step * (startX < endX ? 1 : -1);

      return [x, startY];
    });

    const horizontalSquares = horizontalCoords.map(([x, y]) => board[y][x]);
    const squareWithPiece = horizontalSquares.find((s) => !!s.getPiece());

    if (squareWithPiece) return false;

    // allow movement horizontally
    if (startY === endY) return true;

    return false;
  }

  /**
   * Check if the piece can be moved vertically.
   *
   * Block any other types of movements and validate any collisions on the traveled distance
   * before moving the piece. Prevent piece movement for same square, unexpected direction or
   * if there is another piece on the way.
   *
   * @param board - current board reference
   * @param start - square of the movement start
   * @param end - target square for the movement
   * @returns is piece can be moved from start to end square
   */
  static canMoveVertically(
    board: Square[][],
    start: Square,
    end: Square
  ): boolean {
    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    // prevent movement to the same square
    if (startX === endX && startY === endY) return false;
    // prevent movement horizontally
    if (startX !== endX) return false;

    // verify if there is no collision with other pieces on the board
    const distance = Math.abs(startY > endY ? startY - endY : endY - startY);
    const verticalCoords = Array.from(Array(distance - 1), (item, index) => {
      const step = index + 1;
      const y = startY + step * (startY < endY ? 1 : -1);

      return [startX, y];
    });

    const verticalSquares = verticalCoords.map(([x, y]) => board[y][x]);
    const squareWithPiece = verticalSquares.find((s) => !!s.getPiece());

    if (squareWithPiece) return false;

    // allow movement vertically
    if (startX === endX) return true;

    return false;
  }

  /**
   * Check if the piece can be moved diagonally.
   *
   * Block any other types of movements and validate any collisions on the traveled distance
   * before moving the piece. Prevent piece movement for same square, unexpected direction or
   * if there is another piece on the way.
   *
   * @param board - current board reference
   * @param start - square of the movement start
   * @param end - target square for the movement
   * @returns is piece can be moved from start to end square
   */
  static canMoveDiagonally(
    board: Square[][],
    start: Square,
    end: Square
  ): boolean {
    const [startX, startY] = start.getPosition();
    const [endX, endY] = end.getPosition();

    // prevent movement to the same square
    if (startX === endX && startY === endY) return false;
    // prevent movement horizontally
    if (startX === endX && startY !== endY) return false;
    // prevent movement vertically
    if (startX !== endX && startY === endY) return false;

    // verify diagonal collision with other pieces
    const distance = Math.abs(startX > endX ? startX - endX : endX - startX);
    // get diagonal coordinates generating an array based on travel distance
    // to get target coordinates of each square, we can traverse from X to Y
    // based on direction of the travel, so the `coordinate + (i + 1) * direction`
    // going to be the next coordinate for array
    const diagonalCoords = Array.from(Array(distance - 1), (item, index) => {
      const step = index + 1;
      const x = startX + step * (startX < endX ? 1 : -1);
      const y = startY + step * (startY < endY ? 1 : -1);
      return [x, y];
    });

    // verify if there is no pieces blocking the travel path
    // otherwise prevent movement
    const diagonalSquares = diagonalCoords.map(([x, y]) => board[y][x]);
    const squareWithPiece = diagonalSquares.find((s) => !!s.getPiece());
    if (squareWithPiece) return false;

    // check if the end square has the same value as start one
    // which means they are on the same diagonal, validate both directions:
    // left to right, and right to left
    const ltrDiagonal = startX + startY === endX + endY;
    const rtlDiagonal = startX - startY === endX - endY;
    const isOnSameDiagonal = ltrDiagonal || rtlDiagonal;

    // verify if end square is on the same diagonal
    if (isOnSameDiagonal) return true;

    return false;
  }
}
