import { signal } from "@preact/signals";
import type { CellCounts, CellValue } from "./types/sudoku.ts";

export const selectedNumber = signal<CellValue>("");
export const pencilEnabled = signal(false);
export const eraserEnabled = signal(false);
export const cellCounts = signal<CellCounts>({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
});
export const hasIllegalCells = signal(false);
export const targetCellValue = signal<CellValue>("");
