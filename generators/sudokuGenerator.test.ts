import { describe, expect, it } from "vitest";
import { generateSudoku } from "./sudokuGenerator.ts";
import { BOARD_SIZE } from "../constants.ts";

describe("generateSudoku", () => {
  it("returns a board with correct number of empty cells (medium)", () => {
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
    expect(Math.abs(emptyCount - expected)).toBeLessThanOrEqual(1);
  });

  it("returns a board with correct number of empty cells (easy)", () => {
    const difficulty = 0.3;
    const board = generateSudoku(difficulty);
    let emptyCount = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell.value === "") emptyCount++;
      }
    }
    const expected = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
    expect(Math.abs(emptyCount - expected)).toBeLessThanOrEqual(1);
  });

  it("returns a board with correct number of empty cells (hard)", () => {
    const difficulty = 0.7;
    const board = generateSudoku(difficulty);
    let emptyCount = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell.value === "") emptyCount++;
      }
    }
    const expected = Math.floor(BOARD_SIZE * BOARD_SIZE * difficulty);
    expect(Math.abs(emptyCount - expected)).toBeLessThanOrEqual(1);
  });
});
