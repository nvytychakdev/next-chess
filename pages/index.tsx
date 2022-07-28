import type { NextPage } from "next";
import { ChessBoard } from "../components/ChessBoard";
import { useBoard } from "../hooks/useBoard";

const Home: NextPage = () => {
  const { board } = useBoard();
  return (
    <div className="content">
      <ChessBoard board={board}></ChessBoard>
    </div>
  );
};

export default Home;
