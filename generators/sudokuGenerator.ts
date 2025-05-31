import { BOARD_SIZE } from "../constants/constants.ts";
import type { Board } from "../types/sudoku.ts";
import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import { fillBoard } from "./utils/fillBoard.ts";

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
