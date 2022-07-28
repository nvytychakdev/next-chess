import { FC, useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { Square } from "../models";
import { Piece } from "../models/piece";
import { Pawn } from "../models/pieces/pawn";
import styles from "../styles/ChessBoard.module.scss";
import { ChessBoardSquare } from "./ChessBoardSquare";

const ChessBoard: FC<{ board: Square[][] }> = ({ board }) => {
  const { player, togglePlayer, setPlayer } = usePlayer();
  const [activeSquare, setActiveSquare] = useState<Square | null>(null);

  /**
   * Square Click.
   * TODO: Rename, split into multiple methods checking active piece behaviors.
   *
   * @param board
   * @param square
   * @returns
   */
  const onSquareClick = (board: Square[][], square: Square): void => {
    console.log("Selected square", square);

    const piece = square.piece;

    if (!activeSquare) {
      if (piece) setActiveSquare(square);
    } else {
      const activePiece = activeSquare.piece;

      // verify if piece can be moved
      if (activePiece && activePiece.canMove(board, activeSquare, square)) {
        // verify player's turn
        const isWhitePlayer = player === "white";
        if (
          (activePiece?.isWhite && !isWhitePlayer) ||
          (!activePiece?.isWhite && isWhitePlayer)
        ) {
          console.log("Prevent move, its not your turn");
          return;
        }

        // move piece to a new square
        movePiece(activePiece, activeSquare, square);

        // toggle player's color
        const color = togglePlayer();
        setPlayer(color);
      } else {
        setActiveSquare(square.piece ? square : null);
      }
    }
  };

  /**
   * Pieces movement from start to end square.
   *
   * @param piece
   * @param start
   * @param end
   */
  const movePiece = (piece: Piece, start: Square, end: Square): void => {
    console.log(`Move ${piece} from ${start} to ${end}`);

    start.removePiece();
    end.setPiece(piece);

    if (piece instanceof Pawn) {
      piece.setFirstMove(false);
    }

    setActiveSquare(null);
  };

  return (
    <div className={styles.ChessBoard}>
      {board.map((row) =>
        row.map((col) => (
          <ChessBoardSquare
            key={`${col.x}_${col.y}`}
            active={activeSquare === col}
            piece={col.piece}
            onClick={() => {
              onSquareClick(board, col);
            }}
            onDragStart={() => {
              onSquareClick(board, col);
              console.log("Start drag from", col);
            }}
            onDrop={() => {
              onSquareClick(board, col);
              console.log("Drop into", col);
            }}
          ></ChessBoardSquare>
        ))
      )}
    </div>
  );
};

export { ChessBoard };
