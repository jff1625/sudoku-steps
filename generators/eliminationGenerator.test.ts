import { generateEliminationBoard } from "./eliminationGenerator.ts";
import { BOARD_SIZE } from "../constants/constants.ts";
import { describe, expect, it } from "vitest";
import { PracticeBoardParams } from "../types/sudoku.ts";

describe("generateEliminationBoard", () => {
  it("returns a 9x9 board (random)", () => {
    const board = generateEliminationBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
  });

  it("matches the expected board for fixed params and rng", () => {
    const params: Required<PracticeBoardParams> = {
      x: 3,
      y: 4,
      targetValue: 7,
      orientation: "vertical",
    };
    function* valueGen(values: number[]) {
      let i = 0;
      while (i < values.length) yield values[i++];
      while (true) yield 0;
    }
    // deno-fmt-ignore
    const gen = valueGen(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    const fakeRng = (_min: number, _max: number) => gen.next().value as number;
    const board = generateEliminationBoard(params, fakeRng);
    expect(board.map((col) => col.map((cell) => cell.value))).toEqual([
      ["", "", "", "", "", "", "", "", ""],
      ["", "", 7, "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [3, 2, "", 4, "", 6, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [9, 1, "", 3, 2, 5, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ]);
  });
});
