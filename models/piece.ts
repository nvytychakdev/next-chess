import { Square } from "./square";

/**
 * Chess Piece.
 *
 * Implements alive and white states for active piece.
 * Provides abstract method to verify if piece can be moved into selected square.
 */
export abstract class Piece {
  shortName = "";
  name = "";
  value = 1;
  isAlive = false;
  isWhite: boolean;

  constructor(isWhite: boolean) {
    this.isWhite = isWhite;
  }

  /**
   * Get piece short name abbreviation.
   *
   * @returns
   */
  getShortName(): string {
    return this.shortName;
  }

  /**
   * Get piece name.
   *
   * @returns
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get piece value.
   *
   * @returns piece value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Get Piece string.
   *
   * @returns - piece name
   */
  toString(): string {
    return `${this.getName()}`;
  }

  /**
   * Can move.
   *
   * Verify if piece can be moved from `start` to `end` square.
   *
   * NOTE: All pieces by default can be moved only into the empty square,
   * or the square that is taken by one of the opponent pieces.
   *
   * @param board - board reference with all squares
   * @param start - start square piece currently located in
   * @param end - end square piece is going for
   * @returns validity state of the attempted move
   */
  abstract canMove(board: Square[][], start: Square, end: Square): boolean;
}
