import { useRef } from "preact/hooks";
import { cellCounts, hasIllegalCells } from "../signals.ts";

import type { SudokuGameProps } from "../types/sudoku.ts";
import { createEmptyBoard } from "../utils/sudokuGenerator.ts";
import { NumberPad } from "./NumberPad.tsx";
import { SudokuGrid } from "./SudokuGrid.tsx";

export const SudokuGame = (
  { initialBoard = createEmptyBoard() }: SudokuGameProps,
) => {
  console.log("SudokuGame rendered");
  const gridRef = useRef<HTMLTableElement>(null);

  // Win condition: all cellCounts are 9 and hasIllegalCells is false
  const isWin = !hasIllegalCells.value &&
    Object.values(cellCounts.value).every((v) => v === 9);

  return (
    <div>
      <SudokuGrid
        initialBoard={initialBoard}
        gridRef={gridRef}
      />
      <NumberPad
        gridRef={gridRef}
      />
      {isWin && (
        <div class="mt-4 p-2 bg-green-200 text-green-900 rounded font-bold text-center">
          🎉 Congratulations! You solved the puzzle!
        </div>
      )}
    </div>
  );
};
