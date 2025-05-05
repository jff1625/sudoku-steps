import { BOARD_SIZE } from "../constants.ts";
import type { Board, CellValue } from "../types/sudoku.ts";
import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";

function shuffle<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomFrom(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

function fillBoard(board: Board): boolean {
  const nums: CellValue[] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (board[col][row].value === "") {
        for (const num of nums) {
          if (isCellValueValid(board, col, row, num)) {
            board[col][row].value = num;
            if (fillBoard(board)) return true;
            board[col][row].value = "";
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generateSudoku(difficulty: number = 0.5): Board {
  // 0.5 = medium, 0.7 = hard, 0.3 = easy
  const board: Board = createEmptyBoard();
  fillBoard(board);

  // Remove cells
  const cellsToRemove = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
  let removed = 0;
  while (removed < cellsToRemove) {
    const col = randomFrom(0, BOARD_SIZE - 1);
    const row = randomFrom(0, BOARD_SIZE - 1);
    if (board[col][row].value !== "") {
      board[col][row] = { value: "", pencilmarks: [] };
      removed++;
    }
  }
  return board;
}
