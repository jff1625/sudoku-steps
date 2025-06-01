import { describe, expect, it } from "vitest";
import { generateMissingNumberBoard } from "./missingNumberGenerator.ts";

describe("generateMissingNumberBoard (deterministic)", () => {
  const rngSeq = [2, 5, 1, 7, 3, 0, 8, 4, 6, 2, 1, 0, 5, 7, 8, 3, 4, 6];
  function fakeRngSeq(seq: number[]) {
    let i = 0;
    return (min: number, max: number) => {
      const val = seq[i++ % seq.length];
      return Math.max(min, Math.min(max, val));
    };
  }

  it("produces a stable board for a fixed RNG sequence (horizontal)", () => {
    const board = generateMissingNumberBoard(
      { orientation: "horizontal" },
      fakeRngSeq(rngSeq),
    );
    expect(board.map((col) => col.map((cell) => cell.value))).toEqual([
      ["", "", "", "", "", 7, "", "", ""],
      [1, "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", 4, "", "", ""],
      ["", "", "", "", "", 8, "", "", ""],
      ["", "", "", "", "", 6, "", "", ""],
      ["", "", "", "", "", 2, "", "", ""],
      ["", "", "", "", "", 5, "", "", ""],
      ["", "", "", "", "", 9, "", "", ""],
    ]);
  });

  it("produces a stable board for a fixed RNG sequence (vertical)", () => {
    const board = generateMissingNumberBoard(
      { orientation: "vertical" },
      fakeRngSeq(rngSeq),
    );
    expect(board.map((col) => col.map((cell) => cell.value))).toEqual([
      ["", 1, "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", 4, 8, 6, 2, 5, 9],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ]);
  });
});
