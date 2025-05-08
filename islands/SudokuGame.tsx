import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { cellCounts, hasIllegalCells, targetCellValue } from "../signals.ts";
import { match } from "ts-pattern";

import type { SudokuGameProps, SudokuNumbers } from "../types/sudoku.ts";
import { NumberPad } from "./NumberPad.tsx";
import { SudokuGrid } from "./SudokuGrid.tsx";
import { generateSudoku } from "../generators/sudokuGenerator.ts";
import { generateBandBoard } from "../generators/bandGenerator.ts";
import { generateBand2dBoard } from "../generators/band2dGenerator.ts";
import { randomFrom } from "../utils/randomFrom.ts";

export const SudokuGame = (
  {
    gameMode,
  }: SudokuGameProps,
) => {
  const gridRef = useRef<HTMLTableElement>(null);

  const { board, targetCell, winCondition } = useMemo(() =>
    match(gameMode)
      .with("band", () => {
        const x = randomFrom(0, 8);
        const y = randomFrom(0, 8);
        const targetValue = randomFrom(1, 9) as SudokuNumbers;
        return {
          board: generateBandBoard({ x, y, targetValue }),
          targetCell: { x, y },
          winCondition: () => targetCellValue.value === targetValue,
        };
      })
      .with("band-2d", () => {
        const x = randomFrom(0, 8);
        const y = randomFrom(0, 8);
        const targetValue = randomFrom(1, 9) as SudokuNumbers;
        return {
          board: generateBand2dBoard({ x, y, targetValue }),
          targetCell: { x, y },
          winCondition: () => targetCellValue.value === targetValue,
        };
      })
      .otherwise(() => ({
        board: generateSudoku(),
        targetCell: null,
        winCondition: () =>
          !hasIllegalCells.value &&
          Object.values(cellCounts.value).every((v) => v === 9),
      })), [gameMode]);

  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    setIsWin(winCondition());
  }, [winCondition, cellCounts.value, hasIllegalCells.value]);

  return (
    <div>
      <SudokuGrid
        initialBoard={board}
        gridRef={gridRef}
        targetCell={targetCell}
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
