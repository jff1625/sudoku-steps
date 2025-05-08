import { describe, expect, it } from "vitest";
import { generateSingleCandidateBoard } from "./singleCandidateGenerator.ts";
import type { BandParams } from "../types/sudoku.ts";

const BOARD_SIZE = 9;

describe("singleCandidateGenerator", () => {
  it("board is 9x9", () => {
    const board = generateSingleCandidateBoard();
    expect(board.length).toBe(BOARD_SIZE);
    for (const row of board) {
      expect(row.length).toBe(BOARD_SIZE);
    }
  });

  it("target cell is empty", () => {
    const params: Required<BandParams> = {
      x: 4,
      y: 4,
      targetValue: 7,
      order: "increasing",
      scanDirection: "horizontal",
    };
    const board = generateSingleCandidateBoard(params);
    expect(board[params.x][params.y].value).toBe("");
  });

  it("all other numbers appear exactly once", () => {
    const params: Required<BandParams> = {
      x: 4,
      y: 4,
      targetValue: 7,
      order: "increasing",
      scanDirection: "horizontal",
    };
    const board = generateSingleCandidateBoard(params);
    for (let n = 1; n <= 9; n++) {
      if (n === params.targetValue) continue;
      let count = 0;
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (board[x][y].value === n) count++;
        }
      }
      expect(count).toBe(1);
    }
  });

  it("all placements are in row, col, or box of target cell", () => {
    const params: Required<BandParams> = {
      x: 4,
      y: 4,
      targetValue: 7,
      order: "increasing",
      scanDirection: "horizontal",
    };
    const board = generateSingleCandidateBoard(params);
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const v = board[x][y].value;
        if (typeof v === "number" && v !== params.targetValue) {
          expect(
            x === params.x || y === params.y ||
              (Math.floor(x / 3) === Math.floor(params.x / 3) &&
                Math.floor(y / 3) === Math.floor(params.y / 3)),
          ).toBe(true);
        }
      }
    }
  });

  describe("deterministic with custom rng", () => {
    function* valueGen(values: number[]) {
      let i = 0;
      while (i < values.length) yield values[i++];
      while (true) yield 0;
    }
    const params: Required<BandParams> = {
      x: 4,
      y: 4,
      targetValue: 1,
      order: "increasing",
      scanDirection: "horizontal",
    };
    it("produces expected board for all zeros rng", () => {
      const gen = valueGen([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]);
      const fakeRng = (_min: number, _max: number) =>
        gen.next().value as number;
      const board = generateSingleCandidateBoard(params, fakeRng);
      expect(
        board.map((col) => col.map((cell) => cell.value)),
      ).toMatchInlineSnapshot(`
        [
          [
            "",
            "",
            "",
            "",
            3,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            4,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            5,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            6,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            7,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            8,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            9,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            2,
            "",
            "",
            "",
            "",
          ],
        ]
      `);
    });
    it("produces expected board for ascending rng", () => {
      const gen = valueGen([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
      ]);
      const fakeRng = (_min: number, _max: number) =>
        gen.next().value as number;
      const board = generateSingleCandidateBoard(params, fakeRng);
      expect(
        board.map((col) => col.map((cell) => cell.value)),
      ).toMatchInlineSnapshot(`
        [
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            2,
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            "",
            7,
            "",
            "",
            "",
          ],
          [
            "",
            3,
            "",
            4,
            "",
            "",
            5,
            "",
            6,
          ],
          [
            "",
            "",
            "",
            "",
            "",
            8,
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "",
            "",
            "",
            "",
            9,
            "",
            "",
            "",
            "",
          ],
        ]
      `);
    });
  });
});
