// DRY utility for iterating all cells in a 9x9 Sudoku grid
// Calls fn(x, y) for each cell, in column-major order (matching board[x][y])
export const forEachCell = (fn: (x: number, y: number) => void) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      fn(x, y);
    }
  }
};
