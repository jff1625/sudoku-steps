import { createEmptyBoard, generateSudoku } from "./sudokuGenerator.ts";
import { BOARD_SIZE } from "../constants.ts";
import type { Board } from "../types/sudoku.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.203.0/assert/mod.ts";

Deno.test("createEmptyBoard returns a BOARD_SIZE x BOARD_SIZE grid of empty strings", () => {
  const board = createEmptyBoard();
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
    for (const cell of row) {
      assertEquals(cell, "");
    }
  }
});

Deno.test("generateSudoku returns a valid board shape and valid cell values", () => {
  const board: Board = generateSudoku(0.5);
  assertEquals(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
    for (const cell of row) {
      assert(
        cell === "" || /^[1-9]$/.test(cell),
        `Cell value should be "" or "1"-"9", got "${cell}"`,
      );
    }
  }
});
