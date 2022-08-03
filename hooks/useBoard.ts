import { useState } from "react";
import { Square } from "../models";
import { Piece } from "../models/piece";
import { Bishop } from "../models/pieces/bishop";
import { King } from "../models/pieces/king";
import { Knight } from "../models/pieces/knight";
import { Pawn } from "../models/pieces/pawn";
import { Queen } from "../models/pieces/queen";
import { Rook } from "../models/pieces/rook";

const _MAX_ROWS = 8;
const _MAX_COLS = 8;

const getBackRank = (isWhite: boolean): Piece[] => [
  new Rook(isWhite),
  new Knight(isWhite),
  new Bishop(isWhite),
  new King(isWhite),
  new Queen(isWhite),
  new Bishop(isWhite),
  new Knight(isWhite),
  new Rook(isWhite),
];

const useBoard = () => {
  // generate empty grid 8x8
  const grid = Array.from(Array(_MAX_ROWS), () =>
    new Array(_MAX_COLS).fill(null)
  );

  // generate squared grid of chess board
  const board = grid.map((row, i) => row.map((col, j) => new Square(j, i)));

  // set back rank pieces
  const whiteBackRank = getBackRank(true);
  const blackBackRank = getBackRank(false);
  board[7].forEach((col, index) => col.setPiece(blackBackRank[index]));
  board[0].forEach((col, index) => col.setPiece(whiteBackRank[index]));

  // set pawn rows
  board[6].forEach((col) => col.setPiece(new Pawn(false)));
  board[1].forEach((col) => col.setPiece(new Pawn(true)));

  const [boardState, setBoard] = useState(board);

  console.log("Init board", boardState);

  return { board: boardState, setBoard };
};

export { useBoard };
