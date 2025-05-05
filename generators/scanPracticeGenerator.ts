import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { transposeBoard } from "./utils/transposeBoard.ts";
import { randomFrom } from "./utils/randomFrom.ts";
import type { Board, CellValue, ScanPracticeParams } from "../types/sudoku.ts";

function generateScanPracticeBoardBase(params: ScanPracticeParams = {}): Board {
  const board: Board = createEmptyBoard();
  const x = params.x ?? randomFrom(0, 8);
  const y = params.y ?? randomFrom(0, 8);
  const colBand = Math.floor(x / 3) * 3;
  const rowBand = Math.floor(y / 3) * 3;
  const targetValue = params.targetValue ?? randomFrom(1, 9) as CellValue;
  const order = params.order ?? "increasing";

  // Set the target cell value
  // board[x][y].value = targetValue;

  // 2. Fill the other two cells in the same row of the target box with two different numbers
  const used = new Set<CellValue>([targetValue]);
  for (let cx = colBand; cx < colBand + 3; cx++) {
    if (cx === x) continue;
    let n: CellValue;
    do {
      n = randomFrom(1, 9) as CellValue;
    } while (used.has(n));
    board[cx][y].value = n;
    used.add(n);
  }

  // 3. Place confirming numbers in the other two boxes in the same row band, in different rows
  const otherColBands = [0, 3, 6].filter((b) => b !== colBand);
  const possibleRows = [rowBand, rowBand + 1, rowBand + 2].filter((yy) =>
    yy !== y
  );
  const rowOrder = order === "increasing"
    ? [...possibleRows].sort((a, b) => a - b)
    : [...possibleRows].sort((a, b) => b - a);

  for (let i = 0; i < 2; i++) {
    const band = otherColBands[i];
    let colChoices = [band, band + 1, band + 2];
    colChoices = order === "increasing"
      ? colChoices.sort((a, b) => a - b)
      : colChoices.sort((a, b) => b - a);
    const chosenCol = colChoices[0];
    board[chosenCol][i === 0 ? rowOrder[0] : rowOrder[1]].value = targetValue;
  }
  return board;
}

export function generateScanPracticeBoard(
  params: ScanPracticeParams = {},
): Board {
  const base = generateScanPracticeBoardBase(params);
  if (params.scanDirection === "vertical") {
    return transposeBoard(base);
  }
  return base;
}
