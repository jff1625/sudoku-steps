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
 * Generate a board for the 'band' mode, with optional orientation (horizontal/vertical).
 */
export const generateBandBoard = (
  params: BandPracticeParams = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board => {
  const {
    orientation =
      (rng(0, 1) === 0 ? "horizontal" : "vertical") as PracticeBoardOrientation,
    x = rng(0, 8),
    y = rng(0, 8),
    targetValue = rng(1, 9) as SudokuNumbers,
    order = "increasing",
  } = params;

  const board: Board = createEmptyBoard();
  const colBand = Math.floor(x / 3) * 3;
  const rowBand = Math.floor(y / 3) * 3;

  // 2. Fill the other two cells in the same row of the target box with two different numbers
  const used = new Set<SudokuNumbers>([targetValue]);
  for (let cx = colBand; cx < colBand + 3; cx++) {
    if (cx === x) continue;
    let n: SudokuNumbers;
    do {
      n = rng(1, 9) as SudokuNumbers;
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

  // Transpose if orientation is vertical
  if (orientation === "vertical") {
    return transposeBoard(board);
  }
  return board;
};
