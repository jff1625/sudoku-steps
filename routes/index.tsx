import SudokuBoard from "../islands/SudokuBoard.tsx";
import { generateSudoku } from "../utils/sudokuGenerator.ts";

export default function Home() {
  const board = generateSudoku();

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <SudokuBoard initialBoard={board} />
      </div>
    </div>
  );
}
