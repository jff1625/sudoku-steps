import type { Board, CellValue } from "../../types/sudoku.ts";
import { BOARD_SIZE } from "../../constants/constants.ts";
import { randomFrom } from "../../utils/randomFrom.ts";

/**
 * Fills the given board with a valid Sudoku solution in-place.
 * Accepts an optional rng function for deterministic shuffling.
 */
export function fillBoard(
  board: Board,
  rng: (min: number, max: number) => number = randomFrom,
): boolean {
  const nums: CellValue[] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[col][row].value === "") {
        for (const num of nums) {
          if (isCellValueValid(board, col, row, num)) {
            board[col][row].value = num;
            if (fillBoard(board, rng)) return true;
            board[col][row].value = "";
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isCellValueValid(
  board: Board,
  col: number,
  row: number,
  value: CellValue,
): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[col][i].value === value || board[i][row].value === value) {
      return false;
    }
  }
  const boxCol = Math.floor(col / 3) * 3;
  const boxRow = Math.floor(row / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxCol + i][boxRow + j].value === value) return false;
    }
  }
  return true;
}

function shuffle<T>(
  array: T[],
  rng: (min: number, max: number) => number = randomFrom,
): T[] {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = rng(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
