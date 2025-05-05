import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { generateSudoku } from "./sudokuGenerator.ts";
import { BOARD_SIZE } from "../constants.ts";

Deno.test("generateSudoku returns a board with correct number of empty cells (medium)", () => {
  const difficulty = 0.5;
  const board = generateSudoku(difficulty);
  let emptyCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.value === "") emptyCount++;
    }
  }
  const expected = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
  // Allow a margin of 1 due to possible duplicate removals
  assert(Math.abs(emptyCount - expected) <= 1);
});

Deno.test("generateSudoku returns a board with correct number of empty cells (easy)", () => {
  const difficulty = 0.3;
  const board = generateSudoku(difficulty);
  let emptyCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.value === "") emptyCount++;
    }
  }
  const expected = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
  assert(Math.abs(emptyCount - expected) <= 1);
});

Deno.test("generateSudoku returns a board with correct number of empty cells (hard)", () => {
  const difficulty = 0.7;
  const board = generateSudoku(difficulty);
  let emptyCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.value === "") emptyCount++;
    }
  }
  const expected = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
  assert(Math.abs(emptyCount - expected) <= 1);
});
