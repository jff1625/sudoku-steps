import type {
  Board,
  PracticeBoardOrientation,
  PracticeBoardParams,
  SudokuNumbers,
} from "../types/sudoku.ts";
import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import { transposeBoard } from "./utils/transposeBoard.ts";

/**
 * Generate a board for the 'Missing Number' mode.
 * - Fills the target row with all numbers 1-9.
 * - Clears the target cell and one other cell in the row.
 * - In some other cell in the same column as the 'other' cleared cell, places the target number.
 */
export const generateMissingNumberBoard = (
  params: PracticeBoardParams = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board => {
  const {
    orientation =
      (rng(0, 1) === 0 ? "vertical" : "horizontal") as PracticeBoardOrientation,
    x = rng(0, 8),
    y = rng(0, 8),
    targetValue = rng(1, 9) as SudokuNumbers,
  } = params;
  const board: Board = createEmptyBoard();
  const targetRow = y;
  const targetCol = x;

  // Fill the target row with 1-9, but keep targetValue at targetCol
  const nums = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as SudokuNumbers[]).filter(
    (n) => n !== targetValue,
  );
  // Shuffle the remaining numbers
  for (let i = nums.length - 1; i > 0; i--) {
    const j = rng(0, i);
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // Place the targetValue at targetCol, fill the rest
  for (let x = 0, n = 0; x < 9; x++) {
    if (x === targetCol) {
      board[x][targetRow].value = targetValue;
    } else {
      board[x][targetRow].value = nums[n++];
    }
  }

  // Ensure the target cell contains the target value
  board[targetCol][targetRow].value = targetValue;

  // Pick another cell in the row to clear (not the target cell)
  const originCols = Array.from({ length: 9 }, (_, x) => x).filter((x) =>
    x !== targetCol
  );
  const originCol = originCols[rng(0, originCols.length - 1)];

  // Clear the target cell and the origin cell
  board[targetCol][targetRow].value = "";
  board[originCol][targetRow].value = "";

  // In some other cell in the same column as the origin cleared cell, place the target number
  const originRows = Array.from({ length: 9 }, (_, y) => y).filter((y) =>
    y !== targetRow
  );
  const placeRow = originRows[rng(0, originRows.length - 1)];
  board[originCol][placeRow].value = targetValue;

  // Rotate if needed
  if (orientation === "vertical") {
    return transposeBoard(board);
  }

  return board;
};
