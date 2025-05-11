import { describe, expect, it } from "vitest";
import { generateBand2dBoard } from "./band2dGenerator.ts";
import { BOARD_SIZE } from "../constants/constants.ts";
import type { BandParams } from "../types/sudoku.ts";

describe("generateBand2dBoard", () => {
  it("returns a 9x9 board (random)", () => {
    const board = generateBand2dBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
  });

  it("respects placement rules (deterministic)", () => {
    const params: Required<BandParams> = {
      x: 1,
      y: 4,
      targetValue: 5,
      order: "increasing",
      scanDirection: "horizontal",
    };
    const board = generateBand2dBoard(params);
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
    // Target cell should be empty
    expect(board[params.x][params.y].value).toBe("");

    // There should be exactly three 5s in the board
    let count = 0;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (board[x][y].value === 5) count++;
      }
    }
    expect(count).toBe(3);

    // No two 5s in the same row or column
    const rows = Array(9).fill(0);
    const cols = Array(9).fill(0);
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (board[x][y].value === 5) {
          rows[y]++;
          cols[x]++;
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      expect(rows[i]).toBeLessThanOrEqual(1);
      expect(cols[i]).toBeLessThanOrEqual(1);
    }
  });
});
