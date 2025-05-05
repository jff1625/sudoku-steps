import { SudokuGame } from "../islands/SudokuGame.tsx";
import { generateScanPracticeBoard } from "../generators/scanPracticeGenerator.ts";

export default function Home() {
  const board = generateScanPracticeBoard();

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <SudokuGame initialBoard={board} />
      </div>
    </div>
  );
}
