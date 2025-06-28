import { Board, Box, CellData } from "../../types/sudoku.ts";

/**
 * Returns a Box object for the given box index (0-8) and board.
 * Box index: 0 = top-left, 1 = top-middle, 2 = top-right, 3 = mid-left, ...
 */
export const getBox = (index: number, board: Board): Box => {
  const boxX = (index % 3) * 3;
  const boxY = Math.floor(index / 3) * 3;
  const cells: CellData[] = [];
  const rows = new Set<number>();
  const columns = new Set<number>();
  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      const x = boxX + dx;
      const y = boxY + dy;
      cells.push({ ...board[x][y], x, y });
      rows.add(y);
      columns.add(x);
    }
  }
  return {
    index,
    cells,
    rows: Array.from(rows),
    columns: Array.from(columns),
  };
};
