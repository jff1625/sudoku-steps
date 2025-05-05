import { h as _h } from "preact";
import { useRef } from "preact/hooks";

import type { SudokuGameProps } from "../types/sudoku.ts";
import { createEmptyBoard } from "../utils/sudokuGenerator.ts";
import { NumberPad } from "./NumberPad.tsx";
import { SudokuGrid } from "./SudokuGrid.tsx";

export const SudokuGame = (
  { initialBoard = createEmptyBoard() }: SudokuGameProps,
) => {
  const gridRef = useRef<HTMLTableElement>(null);

  // console.log("SudokuGame initialBoard", initialBoard);

  return (
    <div>
      <SudokuGrid
        initialBoard={initialBoard}
        gridRef={gridRef}
      />
      <NumberPad
        gridRef={gridRef}
      />
    </div>
  );
};
