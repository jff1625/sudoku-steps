import type { Board } from "../../types/sudoku.ts";
import { createEmptyBoard } from "./createEmptyBoard.ts";

export function transposeBoard(board: Board): Board {
  // Transpose a 9x9 board: board[x][y] -> boardT[y][x]
  const transposed = createEmptyBoard();
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      transposed[y][x] = { ...board[x][y] };
    }
  }
  return transposed;
}
