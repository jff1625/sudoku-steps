import { describe, expect, it } from "vitest";
import { generateBandBoard } from "./bandGenerator.ts";
import { BOARD_SIZE } from "../constants/constants.ts";
import type { BandPracticeParams } from "../types/sudoku.ts";

describe("generateBandBoard", () => {
  it("returns a 9x9 board (random)", () => {
    const board = generateBandBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
  });

  it("returns the expected 9x9 board (deterministic)", () => {
    const params: Required<BandPracticeParams> = {
      x: 1,
      y: 2,
      targetValue: 5,
      order: "increasing",
      orientation: "horizontal",
    };
    const board = generateBandBoard(params);
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
    // Check that the target cell is empty
    expect(board[1][2].value).toBe("");
    // Check that the other two cells in the same row of the target box are set and unique
    const colBand = Math.floor(params.x / 3) * 3;
    const used = new Set([
      board[colBand][params.y].value,
      board[colBand + 1][params.y].value,
      board[colBand + 2][params.y].value,
    ]);
    // Should be 2 filled and 1 empty
    expect(used.has("")).toBe(true);
    used.delete("");
    expect(used.size).toBe(2);
    // Check that confirming numbers are placed in the other two boxes in the same row band
    const otherColBands = [0, 3, 6].filter((b) => b !== colBand);
    const possibleRows = [
      Math.floor(params.y / 3) * 3,
      Math.floor(params.y / 3) * 3 + 1,
      Math.floor(params.y / 3) * 3 + 2,
    ].filter((yy) => yy !== params.y);
    expect(board[otherColBands[0]][possibleRows[0]].value).toBe(5);
    expect(board[otherColBands[1]][possibleRows[1]].value).toBe(5);
  });
});
