import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { createEmptyBoard } from "./createEmptyBoard.ts";
import { BOARD_SIZE } from "../../constants.ts";
import type { CellValue } from "../../types/sudoku.ts";
import { randomFrom } from "../../utils/randomFrom.ts";

Deno.test("createEmptyBoard returns a 9x9 board of empty cells", () => {
  const board = createEmptyBoard();
  assertEquals<number>(board.length, BOARD_SIZE);
  for (const row of board) {
    assertEquals(row.length, BOARD_SIZE);
    for (const cell of row) {
      assertEquals(cell.value, "");
      assert(Array.isArray(cell.pencilmarks));
      assertEquals(cell.pencilmarks.length, 0);
    }
  }
});

Deno.test("transposeBoard correctly transposes a 9x9 board", async () => {
  const board = createEmptyBoard();
  // Fill board[x][y] = ((x * BOARD_SIZE + y) % 9) + 1 as CellValue
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      board[x][y].value = (((x * BOARD_SIZE + y) % 9) + 1) as CellValue;
    }
  }
  const { transposeBoard } = await import("./transposeBoard.ts");
  const transposed = transposeBoard(board);
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      // After transpose, transposed[y][x] should equal board[x][y]
      assertEquals(transposed[y][x].value, board[x][y].value);
    }
  }
});

Deno.test("randomFrom returns a value within the specified range", () => {
  const min = 3;
  const max = 7;
  for (let i = 0; i < 100; i++) {
    const result = randomFrom(min, max);
    assert(result >= min && result <= max);
  }
});

Deno.test("randomFrom returns min when min == max", () => {
  assertEquals(randomFrom(5, 5), 5);
});
