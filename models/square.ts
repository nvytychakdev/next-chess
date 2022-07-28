import { Piece } from "./piece";

export const X_SQUARE_NOTATION = ["a", "b", "c", "d", "e", "f", "g", "h"];

export class Square {
  x: number;
  y: number;
  piece?: Piece;

  constructor(x: number, y: number, piece?: Piece) {
    this.x = x;
    this.y = y;

    if (piece) {
      this.piece = piece;
    }
  }

  getPosition(): [number, number] {
    return [this.x, this.y];
  }

  getNotation(): [string, number] {
    const xNotation = X_SQUARE_NOTATION[this.x];
    return [xNotation, 8 - this.y];
  }

  hasPiece(): boolean {
    return !!this.piece;
  }

  getPiece(): Piece | undefined {
    return this.piece;
  }

  setPiece(piece: Piece | undefined): void {
    this.piece = piece;
  }

  removePiece(): void {
    this.piece = undefined;
  }

  toString(): string {
    return `[${this.getPosition().join(":")}]`;
  }
}
