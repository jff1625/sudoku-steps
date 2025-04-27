import { h as _h } from "preact";
import { useRef, useState } from "preact/hooks";

import type { CellValue, SudokuBoardProps } from "../types/sudoku.ts";
import { createEmptyBoard } from "../utils/sudokuGenerator.ts";
import { NumberPad } from "./NumberPad.tsx";
import { SudokuGrid } from "./SudokuGrid.tsx";

export const SudokuGame = (
  { initialBoard = createEmptyBoard() }: SudokuBoardProps,
) => {
  const [selectedNumber, setSelectedNumber] = useState<CellValue>("");
  const [pencilEnabled, setPencilEnabled] = useState<boolean>(false);
  const [eraserEnabled, setEraserEnabled] = useState<boolean>(false);
  const gridRef = useRef<HTMLTableElement>(null);

  return (
    <div>
      <SudokuGrid
        initialBoard={initialBoard}
        selectedNumber={selectedNumber}
        pencilEnabled={pencilEnabled}
        eraserEnabled={eraserEnabled}
      />
      <NumberPad
        selectedNumber={selectedNumber}
        pencilEnabled={pencilEnabled}
        eraserEnabled={eraserEnabled}
        onSelect={(num, pencilMode, eraserMode) => {
          setSelectedNumber(num);
          setPencilEnabled(pencilMode);
          setEraserEnabled(eraserMode);
        }}
        gridRef={gridRef}
      />
    </div>
  );
};
