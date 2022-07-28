import { FC, RefObject } from "react";
import { useDrag } from "../hooks/useDrag";
import { Square } from "../models";
import { Piece } from "../models/piece";
import styles from "../styles/ChessBoard.module.scss";
import { ChessBoardPiece } from "./ChessBoardPiece";

interface ChessBoardSquareProps {
  active: boolean;
  piece?: Piece;
  onClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrop?: () => void;
}

const ChessBoardSquare: FC<ChessBoardSquareProps> = ({
  active,
  piece,
  onDragStart,
  onDragEnd,
  onDrop,
  onClick,
}) => {
  const ref = useDrag({ onDragStart, onDragEnd });

  return (
    <div
      className={`${styles.ChessBoardSquare} ${active ? styles.active : ""}`}
      onClick={() => (onClick ? onClick() : null)}
      onDragEnter={(event) => event.preventDefault()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        console.log(event);
        onDrop ? onDrop() : null;
      }}
    >
      {piece ? (
        <div ref={ref} draggable="true" className={styles.ChessBoardPiece}>
          <ChessBoardPiece
            name={piece.name}
            color={piece.isWhite ? "white" : "black"}
          ></ChessBoardPiece>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { ChessBoardSquare };
