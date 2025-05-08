import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import type { BandParams, Board, SudokuNumbers } from "../types/sudoku.ts";

// Generate a board for the 'single-candidate' mode
export function generateSingleCandidateBoard(
  params: BandParams = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board {
  const board: Board = createEmptyBoard();
  const x = params.x ?? rng(0, 8);
  const y = params.y ?? rng(0, 8);
  const targetValue = params.targetValue ?? rng(1, 9) as SudokuNumbers;

  // Place all other numbers (1-9 except targetValue) in the same row, col, or box as (x, y)
  const others: SudokuNumbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) =>
    n !== targetValue
  ) as SudokuNumbers[];
  // Shuffle the others for random placement using rng
  for (let i = others.length - 1; i > 0; i--) {
    const j = rng(0, i);
    [others[i], others[j]] = [others[j], others[i]];
  }

  // Get all available cells in row, col, and box (excluding the target cell)
  const available: { x: number; y: number; type: "row" | "col" | "box" }[] = [];
  // Row
  for (let xx = 0; xx < 9; xx++) {
    if (xx !== x) available.push({ x: xx, y, type: "row" });
  }
  // Col
  for (let yy = 0; yy < 9; yy++) {
    if (yy !== y) available.push({ x, y: yy, type: "col" });
  }
  // Box
  const boxX = Math.floor(x / 3) * 3;
  const boxY = Math.floor(y / 3) * 3;
  for (let xx = boxX; xx < boxX + 3; xx++) {
    for (let yy = boxY; yy < boxY + 3; yy++) {
      if (
        (xx !== x || yy !== y) &&
        !available.some((cell) => cell.x === xx && cell.y === yy)
      ) {
        available.push({ x: xx, y: yy, type: "box" });
      }
    }
  }

  // Randomly assign each other number to a unique available cell
  for (let i = 0; i < others.length; i++) {
    let idx = rng(0, available.length - 1);
    // Ensure idx is always in range (wrap around if needed)
    if (idx < 0 || idx >= available.length) {
      idx = ((idx % available.length) + available.length) % available.length;
    }
    const { x: xx, y: yy } = available.splice(idx, 1)[0];
    board[xx][yy].value = others[i];
  }

  // Target cell remains empty
  return board;
}
