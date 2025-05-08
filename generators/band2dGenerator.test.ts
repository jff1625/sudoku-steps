import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { generateBand2dBoard } from "./band2dGenerator.ts";
import { BOARD_SIZE } from "../constants.ts";
import type { BandParams } from "../types/sudoku.ts";

Deno.test("generateBand2dBoard returns a 9x9 board (random)", () => {
  const board = generateBand2dBoard();
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
  }
});

Deno.test("generateBand2dBoard respects placement rules (deterministic)", () => {
  const params: Required<BandParams> = {
    x: 1,
    y: 4,
    targetValue: 5,
    order: "increasing",
    scanDirection: "horizontal",
  };
  const board = generateBand2dBoard(params);
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
  }
  // Target cell should be empty
  assertEquals(board[params.x][params.y].value, "");

  // There should be exactly three 5s in the board
  let count = 0;
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y].value === 5) count++;
    }
  }
  assertEquals(count, 3);

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
    assert(rows[i] <= 1);
    assert(cols[i] <= 1);
  }
});
