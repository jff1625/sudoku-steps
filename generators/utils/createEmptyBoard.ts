import { BOARD_SIZE } from "../../constants/constants.ts";
import type { Board, CellData } from "../../types/sudoku.ts";

export function createEmptyBoard(): Board {
  // Outer array is columns, inner array is rows
  return Array.from(
    { length: BOARD_SIZE },
    (_col, colIdx) =>
      Array.from({ length: BOARD_SIZE }, (_row, rowIdx) => ({
        value: "",
        x: colIdx,
        y: rowIdx,
        pencilmarks: [],
      } as CellData)),
  ) as Board;
}
