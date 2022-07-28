import { useState } from "react";

const usePlayer = () => {
  const [player, setPlayer] = useState("white");

  const togglePlayer = () => {
    if (player === "white") {
      return "black";
    } else if (player === "black") {
      return "white";
    }
    return "white";
  };

  return { player, togglePlayer, setPlayer };
};

export { usePlayer };
