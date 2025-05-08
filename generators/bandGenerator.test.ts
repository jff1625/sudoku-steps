import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { generateBandBoard } from "./bandGenerator.ts";
import { BOARD_SIZE } from "../constants.ts";
import type { BandParams } from "../types/sudoku.ts";

Deno.test("generateBandBoard returns a 9x9 board (random)", () => {
  const board = generateBandBoard();
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
  }
});

Deno.test("generateBandBoard returns the expected 9x9 board (deterministic)", () => {
  type RequiredBandParams = Required<BandParams>;
  const params: RequiredBandParams = {
    x: 1,
    y: 2,
    targetValue: 5,
    order: "increasing",
    scanDirection: "horizontal",
  };
  const board = generateBandBoard(params);
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
  }
  // Check that the target cell is empty
  assertEquals(board[1][2].value, "");
  // Check that the other two cells in the same row of the target box are set and unique
  const colBand = Math.floor(params.x / 3) * 3;
  const used = new Set([
    board[colBand][params.y].value,
    board[colBand + 1][params.y].value,
    board[colBand + 2][params.y].value,
  ]);
  // Should be 2 filled and 1 empty
  assert(used.has(""));
  used.delete("");
  assertEquals(used.size, 2);
  // Check that confirming numbers are placed in the other two boxes in the same row band
  const otherColBands = [0, 3, 6].filter((b) => b !== colBand);
  const possibleRows = [
    Math.floor(params.y / 3) * 3,
    Math.floor(params.y / 3) * 3 + 1,
    Math.floor(params.y / 3) * 3 + 2,
  ].filter((yy) => yy !== params.y);
  assertEquals(board[otherColBands[0]][possibleRows[0]].value, 5);
  assertEquals(board[otherColBands[1]][possibleRows[1]].value, 5);
});
