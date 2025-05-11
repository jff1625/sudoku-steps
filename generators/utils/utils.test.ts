import { describe, expect, it } from "vitest";
import { createEmptyBoard } from "./createEmptyBoard.ts";
import { BOARD_SIZE } from "../../constants/constants.ts";
import type { CellValue } from "../../types/sudoku.ts";
import { randomFrom } from "../../utils/randomFrom.ts";
import { transposeBoard } from "./transposeBoard.ts";

describe("createEmptyBoard", () => {
  it("returns a 9x9 board of empty cells", () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
      for (const cell of row) {
        expect(cell.value).toBe("");
        expect(Array.isArray(cell.pencilmarks)).toBe(true);
        expect(cell.pencilmarks.length).toBe(0);
      }
    }
  });
});

describe("transposeBoard", () => {
  it("correctly transposes a 9x9 board", () => {
    const board = createEmptyBoard();
    // Fill board[x][y] = ((x * BOARD_SIZE + y) % 9) + 1 as CellValue
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        board[x][y].value = (((x * BOARD_SIZE + y) % 9) + 1) as CellValue;
      }
    }
    const transposed = transposeBoard(board);
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        // After transpose, transposed[y][x] should equal board[x][y]
        expect(transposed[y][x].value).toBe(board[x][y].value);
      }
    }
  });
});

describe("randomFrom", () => {
  it("returns a value within the specified range", () => {
    const min = 3;
    const max = 7;
    for (let i = 0; i < 100; i++) {
      const result = randomFrom(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });

  it("returns min when min == max", () => {
    expect(randomFrom(5, 5)).toBe(5);
  });
});
