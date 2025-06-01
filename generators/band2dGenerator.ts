import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { transposeBoard } from "./utils/transposeBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import type {
  BandPracticeParams,
  Board,
  PracticeBoardOrientation,
  SudokuNumbers,
} from "../types/sudoku.ts";

/**
 * Generate a board for the 'band-2d' mode, with optional orientation (horizontal/vertical).
 */
export const generateBand2dBoard = (
  params: BandPracticeParams = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board => {
  const {
    orientation =
      (rng(0, 1) === 0 ? "horizontal" : "vertical") as PracticeBoardOrientation,
    x = rng(0, 8),
    y = rng(0, 8),
    targetValue = rng(1, 9) as SudokuNumbers,
  } = params;

  // --- Begin horizontal band2d logic (formerly generateHorizontalBand2dBoard) ---
  const board: Board = createEmptyBoard();
  const colBand = Math.floor(x / 3) * 3;
  const rowBand = Math.floor(y / 3) * 3;

  // 1. Place one blocking number in the same box as the target cell (not at (x, y)), and in the same row as the target cell
  let blockPlaced = false;
  let blockCoords = { cx: -1, cy: -1 };
  for (let cx = colBand; cx < colBand + 3 && !blockPlaced; cx++) {
    if (cx === x) continue;
    let blockValue;
    let attempts = 0;
    do {
      blockValue = rng(1, 9) as SudokuNumbers;
      attempts++;
      if (attempts > 20) break;
    } while (blockValue === targetValue);
    board[cx][y].value = blockValue;
    blockCoords = { cx, cy: y };
    blockPlaced = true;
  }

  // 2. Place the targetValue in two other boxes in the main band (not in the same box as the target cell)
  const mainBandBoxes: Array<{ bx: number; by: number }> = [];
  for (let bx = 0; bx < 9; bx += 3) {
    if (bx === colBand) continue;
    mainBandBoxes.push({ bx, by: rowBand });
  }
  const usedRows = new Set<number>([y]);
  const usedCols = new Set<number>([x]);
  for (const { bx, by } of mainBandBoxes) {
    let cx, cy, attempts = 0;
    do {
      cx = bx + rng(0, 2);
      cy = by + rng(0, 2);
      attempts++;
      if (attempts > 20) break;
    } while (usedRows.has(cy) || usedCols.has(cx));
    board[cx][cy].value = targetValue;
    usedRows.add(cy);
    usedCols.add(cx);
  }

  // 3. Place the targetValue in a perpendicular band (not in the same box as the target cell)
  const perpBandBoxes: Array<{ bx: number; by: number }> = [];
  for (let by = 0; by < 9; by += 3) {
    if (by === rowBand) continue;
    perpBandBoxes.push({ bx: colBand, by });
  }
  if (perpBandBoxes.length > 0) {
    let cx, cy, attempts = 0;
    let idx;
    do {
      idx = rng(0, perpBandBoxes.length - 1);
      const { bx, by } = perpBandBoxes[idx];
      cx = bx + rng(0, 2);
      cy = by + rng(0, 2);
      attempts++;
      if (attempts > 20) break;
    } while (
      usedRows.has(cy) ||
      usedCols.has(cx) ||
      (cx === blockCoords.cx || cy === blockCoords.cy)
    );
    board[cx][cy].value = targetValue;
    usedRows.add(cy);
    usedCols.add(cx);
  }
  // --- End horizontal band2d logic ---

  // Transpose if orientation is vertical
  if (orientation === "vertical") {
    return transposeBoard(board);
  }
  return board;
};
