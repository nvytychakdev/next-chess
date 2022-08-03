import { FC, RefObject, useState } from "react";
import { useDrag } from "../hooks/useDrag";
import { useDrop } from "../hooks/useDrop";
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
  const [isDraggedOver, setDraggedOver] = useState(false);
  const dragRef = useDrag<HTMLDivElement>({ onDragStart, onDragEnd });
  const dropRef = useDrop<HTMLDivElement>({
    onDrop: () => {
      setDraggedOver(false);
      onDrop ? onDrop() : null;
    },
    onDragEnter: () => {
      console.log("drag enter");
      setDraggedOver(true);
    },
    onDragLeave: () => {
      console.log("drag leave");
      setDraggedOver(false);
    },
  });

  return (
    <div
      ref={dropRef}
      className={`${styles.ChessBoardSquare} ${active ? styles.active : ""}  ${
        isDraggedOver ? styles.dragTarget : ""
      }`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {piece ? (
        <div ref={dragRef} draggable="true" className={styles.ChessBoardPiece}>
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
