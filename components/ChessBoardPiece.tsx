import Image from "next/image";
import { FC, RefObject } from "react";

const ChessBoardPiece: FC<{
  name: string;
  color: "white" | "black";
}> = ({ name, color }) => {
  return (
    <Image
      src={`/pieces/${name}_${color}.svg`}
      alt={`${color}_${name}`}
      layout="fill"
      draggable="false"
    ></Image>
  );
};

export { ChessBoardPiece };
