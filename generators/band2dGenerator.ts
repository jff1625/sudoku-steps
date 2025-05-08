import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { transposeBoard } from "./utils/transposeBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import type { BandParams, Board, CellValue } from "../types/sudoku.ts";

function generateHorizontalBand2dBoard(params: BandParams = {}): Board {
  const board: Board = createEmptyBoard();
  const x = params.x ?? randomFrom(0, 8);
  const y = params.y ?? randomFrom(0, 8);
  const colBand = Math.floor(x / 3) * 3;
  const rowBand = Math.floor(y / 3) * 3;
  const targetValue = params.targetValue ?? randomFrom(1, 9) as CellValue;

  console.log("Target cell:", { x, y, targetValue });
  // board[x][y].value = targetValue; // Uncomment if you want to prefill

  // 1. Place one blocking number in the same box as the target cell (not at (x, y)), and in the same row as the target cell
  let blockPlaced = false;
  let blockCoords = { cx: -1, cy: -1 };
  for (let cx = colBand; cx < colBand + 3 && !blockPlaced; cx++) {
    if (cx === x) continue;
    let blockValue;
    let attempts = 0;
    do {
      blockValue = randomFrom(1, 9) as CellValue;
      attempts++;
      if (attempts > 20) break;
    } while (blockValue === targetValue);
    board[cx][y].value = blockValue;
    blockCoords = { cx, cy: y };
    console.log("Placed blocking number", blockValue, "at", { cx, cy: y });
    blockPlaced = true;
  }

  // 2. Place the targetValue in two other boxes in the main band (not in the same box as the target cell)
  const mainBandBoxes: Array<{ bx: number; by: number }> = [];
  for (let bx = 0; bx < 9; bx += 3) {
    if (bx === colBand) continue;
    mainBandBoxes.push({ bx, by: rowBand });
  }
  // Track used rows and columns for targetValue
  const usedRows = new Set<number>([y]);
  const usedCols = new Set<number>([x]);
  // Place targetValue in a random cell in each of these two boxes
  for (const { bx, by } of mainBandBoxes) {
    let cx, cy, attempts = 0;
    do {
      cx = bx + randomFrom(0, 2);
      cy = by + randomFrom(0, 2);
      attempts++;
      if (attempts > 20) break;
    } while (usedRows.has(cy) || usedCols.has(cx));
    board[cx][cy].value = targetValue;
    usedRows.add(cy);
    usedCols.add(cx);
    console.log("Placed targetValue (main band)", targetValue, "at", {
      cx,
      cy,
      bx,
      by,
    });
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
      idx = randomFrom(0, perpBandBoxes.length - 1);
      const { bx, by } = perpBandBoxes[idx];
      cx = bx + randomFrom(0, 2);
      cy = by + randomFrom(0, 2);
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
    console.log("Placed targetValue (perpendicular band)", targetValue, "at", {
      cx,
      cy,
    });
  }

  return board;
}

export function generateBand2dBoard(params: BandParams = {}): Board {
  if (params.scanDirection === "vertical") {
    // Generate as horizontal, then transpose
    const base = generateHorizontalBand2dBoard({
      ...params,
      scanDirection: "horizontal",
    });
    return transposeBoard(base);
  }
  return generateHorizontalBand2dBoard(params);
}
