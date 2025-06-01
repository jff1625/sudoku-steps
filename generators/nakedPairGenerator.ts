import type {
  Board,
  PracticeBoardParams,
  SudokuNumbers,
} from "../types/sudoku.ts";
import { createEmptyBoard } from "./utils/createEmptyBoard.ts";
import { fillBoard } from "./utils/fillBoard.ts";
import { randomFrom } from "../utils/randomFrom.ts";

export type NakedPairUnitType = "row" | "column" | "box";

/**
 * Generate a board for the 'Naked Pair' technique.
 * - Picks two cells in a unit (row, column, or box) and erases them.
 * - The values from the solved board at those cells become the naked pair.
 * - All other cells in the unit are set to values not in the pair.
 */

// Helper to get all cell positions in a unit by index
function getUnitCells(
  unitType: NakedPairUnitType,
  index: number,
): { x: number; y: number }[] {
  if (unitType === "row") {
    return Array.from({ length: 9 }, (_, i) => ({ x: i, y: index }));
  }
  if (unitType === "column") {
    return Array.from({ length: 9 }, (_, i) => ({ x: index, y: i }));
  }
  // box
  const boxX = (index % 3) * 3;
  const boxY = Math.floor(index / 3) * 3;
  const cells = [];
  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      cells.push({ x: boxX + dx, y: boxY + dy });
    }
  }
  return cells;
}

export const generateNakedPairBoard = (
  params: PracticeBoardParams & {
    unitType?: NakedPairUnitType;
  } = {},
  rng: (min: number, max: number) => number = randomFrom,
): Board => {
  const {
    x = rng(0, 8),
    y = rng(0, 8),
    targetValue = rng(1, 9) as SudokuNumbers,
    unitType = "column",
  } = params;

  // Start from an empty board, place targetValue at the target cell, then fill
  const board = createEmptyBoard();
  board[x][y].value = targetValue;
  fillBoard(board, rng);

  // Only support 'column' unitType for now
  if (unitType !== "column") {
    throw new Error("Only 'column' unitType is currently supported");
  }

  // Get all cell positions in the column
  const unitCells: { x: number; y: number }[] = getUnitCells("column", x);
  const targetCellIdx = y;
  // Build an array of available indices (excluding the target cell)
  const availableIndices = unitCells.map((_, i) => i).filter((i) =>
    i !== targetCellIdx
  );
  // Select the first pair index randomly and remove it from the list
  const pairAIdx =
    availableIndices.splice(rng(0, availableIndices.length - 1), 1)[0];
  // Select the second pair index randomly from the remaining
  const pairBIdx =
    availableIndices.splice(rng(0, availableIndices.length - 1), 1)[0];
  // Select a fourth cell (not the target or pair cells)
  const fourthIdx =
    availableIndices.splice(rng(0, availableIndices.length - 1), 1)[0];

  const targetCell = unitCells[targetCellIdx];
  const pairA = unitCells[pairAIdx];
  const pairB = unitCells[pairBIdx];
  const fourthCell = unitCells[fourthIdx];

  // Store the values of the naked pair and fourth cell before erasing
  const pairValueA = board[pairA.x][pairA.y].value as SudokuNumbers;
  const pairValueB = board[pairB.x][pairB.y].value as SudokuNumbers;
  const fourthValue = board[fourthCell.x][fourthCell.y].value as SudokuNumbers;

  // Log target, pair, and fourth selection
  // deno-lint-ignore no-console
  console.log("Naked Pair target cell:", targetCell, "value:", targetValue);
  // deno-lint-ignore no-console
  console.log(
    "Naked Pair pair cells:",
    pairA,
    pairValueA,
    pairB,
    pairValueB,
    "Fourth cell:",
    fourthCell,
    fourthValue,
  );

  // Erase the naked pair cells, the target cell, and the fourth cell
  board[pairA.x][pairA.y].value = "";
  board[pairB.x][pairB.y].value = "";
  board[targetCell.x][targetCell.y].value = "";
  board[fourthCell.x][fourthCell.y].value = "";

  // In the rows of the pair cells, erase all except target number and fourth number
  [pairA, pairB].forEach(({ y: rowIdx }) => {
    for (let col = 0; col < 9; col++) {
      // Skip the column if it's the target, pair, or fourth cell
      if (
        (col === x &&
          (rowIdx === targetCell.y || rowIdx === pairA.y ||
            rowIdx === pairB.y || rowIdx === fourthCell.y))
      ) continue;
      const cellValue = board[col][rowIdx].value;
      if (cellValue !== targetValue && cellValue !== fourthValue) {
        board[col][rowIdx].value = "";
      }
    }
  });

  // In the target row, erase all except the fourth number
  for (let col = 0; col < 9; col++) {
    if (col === x) continue; // skip the target cell itself
    if (board[col][y].value !== fourthValue) {
      board[col][y].value = "";
    }
  }

  return board;
};
