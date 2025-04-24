import { BOARD_SIZE } from "../constants.ts";
import type { Board, CellValue, Row } from "../types/sudoku.ts";

export function createEmptyBoard(): Board {
  return Array.from(
    { length: BOARD_SIZE },
    () =>
      Array.from({ length: BOARD_SIZE }, () => "" as CellValue) as Row<
        CellValue
      >,
  ) as Board;
}

function shuffle<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isValid(board: Board, row: number, col: number, num: number): boolean {
  const numStr = num.toString() as CellValue;
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[row][i] === numStr || board[i][col] === numStr) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === numStr) return false;
    }
  }
  return true;
}

function fillBoard(board: Board): boolean {
  const nums = shuffle(
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as CellValue[],
  );
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === "") {
        for (const num of nums) {
          if (isValid(board, row, col, Number(num))) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = "" as CellValue;
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
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (board[row][col] !== "") {
      board[row][col] = "" as CellValue;
      removed++;
    }
  }
  return board;
}
