// import { Piece } from "./piece";
// import { Bishop } from "./pieces/bishop";
// import { King } from "./pieces/king";
// import { Knight } from "./pieces/knight";
// import { Pawn } from "./pieces/pawn";
// import { Queen } from "./pieces/queen";
// import { Rook } from "./pieces/rook";
// import { Square } from "./square";

// export class Board {
//   readonly _MAX_ROWS = 8;
//   readonly _MAX_COLS = 8;
//   grid?: Square[][];

//   constructor() {
//     this.resetGrid();
//   }

//   resetGrid(): void {
//     // generate empty grid 8x8
//     const grid = Array.from(Array(this._MAX_ROWS), () =>
//       new Array(this._MAX_COLS).fill(null)
//     );

//     // generate squared grid of chess board
//     const chessGrid = grid.map((row, i) =>
//       row.map((col, j) => new Square(j, i, !!((i + j) % 2)))
//     );

//     // set backranks
//     const whiteBackRank = this._getBackRank(true);
//     const blackBackRank = this._getBackRank(false);
//     chessGrid[7].forEach((col, index) => col.setPiece(blackBackRank[index]));
//     chessGrid[0].forEach((col, index) => col.setPiece(whiteBackRank[index]));

//     // set pawn rows
//     chessGrid[6].forEach((col) => col.setPiece(new Pawn(false)));
//     chessGrid[1].forEach((col) => col.setPiece(new Pawn(true)));

//     this.grid = chessGrid;
//   }

//   private _getBackRank(isWhite: boolean): Piece[] {
//     return [
//       new Rook(isWhite),
//       new Knight(isWhite),
//       new Bishop(isWhite),
//       new King(isWhite),
//       new Queen(isWhite),
//       new Bishop(isWhite),
//       new Knight(isWhite),
//       new Rook(isWhite),
//     ];
//   }

//   getGrid(): Square[][] {
//     if (!this.grid) throw new Error("No grid initialized");
//     return this.grid;
//   }

//   getSquareByCoords(x: number, y: number): Square {
//     if (!this.grid) throw new Error("No grid initialized.");

//     const xInvalid = x >= 8 || x < 0;
//     const yInvalid = y >= 8 || y < 0;
//     if (xInvalid || yInvalid)
//       throw new Error(`Invalid coordinates: x: ${x}, y: ${y}`);

//     return this.grid[x][y];
//   }

//   getSquareByNotation(x: string, y: number): Square {
//     if (!this.grid) throw new Error("No grid initialized.");

//     const square = this.grid.reduce<Square | null>((acc, row) => {
//       const foundSquare = row.find((col) => {
//         const [_x, _y] = col.getNotation();
//         return _x === x && _y === y;
//       });

//       if (foundSquare) {
//         acc = foundSquare;
//       }

//       return acc;
//     }, null);

//     if (!square) throw new Error("No square found");

//     return square;
//   }
// }
