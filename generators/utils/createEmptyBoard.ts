import { BOARD_SIZE } from "../../constants/constants.ts";
import type { Board, CellData } from "../../types/sudoku.ts";

export function createEmptyBoard(): Board {
  // Outer array is columns, inner array is rows
  return Array.from(
    { length: BOARD_SIZE },
    () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        value: "",
        pencilmarks: [],
      } as CellData)),
  ) as Board;
}
