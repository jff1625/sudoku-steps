import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { cellCounts, hasIllegalCells, targetCellValue } from "../signals.ts";
import { match } from "ts-pattern";

import type { SudokuGameProps, SudokuNumbers } from "../types/sudoku.ts";
import { GAME_MODE_DETAILS } from "../constants/constants.ts";
import { NumberPad } from "./NumberPad.tsx";
import { SudokuGrid } from "./SudokuGrid.tsx";
import { generateSudoku } from "../generators/sudokuGenerator.ts";
import { generateBandBoard } from "../generators/bandGenerator.ts";
import { generateBand2dBoard } from "../generators/band2dGenerator.ts";
import { generateSingleCandidateBoard } from "../generators/singleCandidateGenerator.ts";
import { generateEliminationBoard } from "../generators/eliminationGenerator.ts";
import { generateMissingNumberBoard } from "../generators/missingNumberGenerator.ts";
import { generateNakedPairBoard } from "../generators/nakedPairGenerator.ts";

import { randomFrom } from "../utils/randomFrom.ts";

export const SudokuGame = (
  {
    gameMode,
  }: SudokuGameProps,
) => {
  console.log("SudokuGame render");
  const gridRef = useRef<HTMLTableElement>(null);

  const { board, targetCell, winCondition } = useMemo(() => {
    // "normal" mode is a special case with its own params
    if (gameMode === "normal") {
      return {
        board: generateSudoku(),
        targetCell: null,
        winCondition: () =>
          !hasIllegalCells.value &&
          Object.values(cellCounts.value).every((v) => v === 9),
      };
    }

    // Add naked-pair mode
    if (gameMode === "naked-pair") {
      // For now, use default params (random unitType, unitIndex, etc)
      // You may want to expose these in the UI for more control
      const params = {};
      const board = generateNakedPairBoard(params);
      // Find the two empty cells (the naked pair)
      const pairCells: { x: number; y: number }[] = [];
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (board[x][y].value === "") {
            pairCells.push({ x, y });
          }
        }
      }
      // Use the first as targetCell for now
      return {
        board,
        targetCell: pairCells[0] ?? null,
        winCondition: () =>
          pairCells.every(({ x, y }) => board[x][y].value !== ""),
      };
    }

    // "practice" modes all have the same params
    const params = {
      x: randomFrom(0, 8),
      y: randomFrom(0, 8),
      targetValue: randomFrom(1, 9) as SudokuNumbers,
    };

    console.log("SudokuGame target cell:", params);

    const board = match(gameMode)
      .with("band", () => generateBandBoard(params))
      .with("band-2d", () => generateBand2dBoard(params))
      .with("single-candidate", () => generateSingleCandidateBoard(params))
      .with("elimination", () => generateEliminationBoard(params))
      .with("missing-number", () => generateMissingNumberBoard(params))
      .exhaustive();

    return {
      board,
      targetCell: { x: params.x, y: params.y },
      winCondition: () => targetCellValue.value === params.targetValue,
    };
  }, [gameMode]);

  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    console.log("SudokuGame useEffect - checking win condition");
    setIsWin(winCondition());
  }, [winCondition, cellCounts.value, hasIllegalCells.value]);

  return (
    <div class="w-full flex flex-col items-center">
      <div class="flex justify-center w-full">
        <SudokuGrid
          initialBoard={board}
          gridRef={gridRef}
          targetCell={targetCell}
        />
      </div>
      {/* Responsive NumberPad container: wrap and center on narrow screens */}
      <div class="w-full flex flex-wrap justify-center items-center">
        <NumberPad gridRef={gridRef} />
      </div>
      {/* Instruction or win message */}
      <div class="mt-2 w-full flex justify-center">
        {isWin
          ? (
            <div class="p-2 bg-green-200 text-green-900 rounded font-bold text-center">
              🎉 Congratulations! You solved the puzzle!
            </div>
          )
          : (
            <div class="px-2 py-1 bg-green-50 text-green-900 rounded text-xs text-center">
              {GAME_MODE_DETAILS[gameMode].instructions}
            </div>
          )}
      </div>
    </div>
  );
};
