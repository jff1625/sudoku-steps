import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { fillBoard } from "./utils/fillBoard.ts";
import type {
  Board,
  PracticeBoardOrientation,
  PracticeBoardParams,
  SudokuNumbers,
} from "../types/sudoku.ts";
import { randomFrom } from "../utils/randomFrom.ts";
import { forEachCell } from "./utils/forEachCell.ts";
import { transposeBoard } from "./utils/transposeBoard.ts";

/**
 * Generate a board for the 'elimination' mode by starting from a valid filled board and erasing cells as needed.
 */
export const generateEliminationBoard = (
  params: PracticeBoardParams = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board => {
  // Use destructuring with defaults for all params
  const {
    orientation =
      (rng(0, 1) === 0 ? "vertical" : "horizontal") as PracticeBoardOrientation,
    x = rng(0, 8),
    y = rng(0, 8),
    targetValue = rng(1, 9) as SudokuNumbers,
  } = params;

  const targetCol = x;
  const targetRow = y;
  const board: Board = createEmptyBoard();
  board[targetCol][targetRow].value = targetValue;
  fillBoard(board, rng);

  // A "box" knows which row and columns it occupies.
  const getBox = (boxX: number, boxY: number) => {
    const rows = [boxY * 3, boxY * 3 + 1, boxY * 3 + 2];
    const cols = [boxX * 3, boxX * 3 + 1, boxX * 3 + 2];
    return { rows, cols };
  };

  const targetBoxX = Math.floor(targetCol / 3);
  const targetBoxY = Math.floor(targetRow / 3);
  const targetBox = getBox(targetBoxX, targetBoxY);
  const secondBoxX = targetBoxX;

  // Find a valid origin cell: must have same value, not in any box in the target box column
  const possibleOrigins: { x: number; y: number }[] = [];
  forEachCell((x, y) => {
    if (
      (x === targetCol && y === targetRow) ||
      board[x][y].value !== targetValue
    ) return;
    const boxX = Math.floor(x / 3), boxY = Math.floor(y / 3);
    if (boxX === targetBoxX) return;
    if (boxX === secondBoxX && boxY === Math.floor(targetRow / 3)) return;
    possibleOrigins.push({ x, y });
  });
  if (!possibleOrigins.length) {
    throw new Error("No valid origin cell found for eliminate mode");
  }
  let { x: originCol, y: originRow } =
    possibleOrigins[rng(0, possibleOrigins.length - 1)];
  let secondBoxY = Math.floor(originRow / 3);
  if (secondBoxY === targetBoxY) {
    const filtered = possibleOrigins.filter(({ y }) =>
      Math.floor(y / 3) !== targetBoxY
    );
    if (!filtered.length) {
      throw new Error(
        "No valid origin cell found with second box different from target box",
      );
    }
    ({ x: originCol, y: originRow } = filtered[rng(0, filtered.length - 1)]);
    secondBoxY = Math.floor(originRow / 3);
  }
  const secondBox = getBox(secondBoxX, secondBoxY);

  // 1. Delete all cells outside targetBox and secondBox, except for the origin cell
  forEachCell((x, y) => {
    const inTargetBox = targetBox.cols.includes(x) &&
      targetBox.rows.includes(y);
    const inSecondBox = secondBox.cols.includes(x) &&
      secondBox.rows.includes(y);
    const isOrigin = x === originCol && y === originRow;
    if (!inTargetBox && !inSecondBox && !isOrigin) board[x][y].value = "";
  });
  // 2. Delete all instances of the target number except for the origin cell
  let axisCol: number | null = null;
  forEachCell((x, y) => {
    const isOrigin = x === originCol && y === originRow;
    const inSecondBox = secondBox.cols.includes(x) &&
      secondBox.rows.includes(y);
    if (!isOrigin && board[x][y].value === targetValue) {
      board[x][y].value = "";
      if (inSecondBox) axisCol = x;
    }
  });
  // 3. Delete all cells in the axis column (except the origin cell)
  if (axisCol !== null) {
    for (let y = 0; y < 9; y++) {
      if (!(axisCol === originCol && y === originRow)) {
        board[axisCol][y].value = "";
      }
    }
  }
  // 4. Delete all other cells in the origin row (except the origin cell)
  for (let x = 0; x < 9; x++) {
    if (x !== originCol) board[x][originRow].value = "";
  }

  // Rotate if needed
  if (orientation === "horizontal") {
    return transposeBoard(board);
  }
  return board;
};
