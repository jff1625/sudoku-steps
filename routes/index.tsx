import { SudokuGame } from "../islands/SudokuGame.tsx";

import type { GameMode } from "../types/sudoku.ts";

export default function Home() {
  const gameMode: GameMode = "band-2d";

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <SudokuGame gameMode={gameMode} />
      </div>
    </div>
  );
}
