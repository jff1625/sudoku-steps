import type { GameMode } from "../types/sudoku.ts";

export const GAME_MODES = [
  "normal",
  "band",
  "band-2d",
  "single-candidate",
  "elimination",
  "missing-number",
  "naked-pair",
] as const;

export const BOARD_SIZE = 9;

export const GAME_MODE_DETAILS: Record<
  GameMode,
  { name: string; description: string; instructions: string; example?: string }
> = {
  normal: {
    name: "Normal",
    description:
      "Standard Sudoku rules apply: fill each row, column, and box with the numbers 1-9 without repetition.",
    instructions:
      "Fill every row, column, and 3x3 box with the numbers 1–9. No repeats!",
    example:
      "Each number 1-9 must appear exactly once in every row, column, and 3x3 box.",
  },

  band: {
    name: "Single Band",
    description:
      "A special mode or constraint involving bands (groups of rows or columns).",
    instructions:
      "Identify the target cell and place the correct number to win.",
    example:
      "For example, a band may require certain numbers to appear only within a specific set of rows.",
  },
  "band-2d": {
    name: "Two Bands",
    description:
      "A two-dimensional band constraint, possibly involving both rows and columns.",
    instructions:
      "Identify the target cell and place the correct number to win.",
    example:
      "Numbers may be restricted to certain bands both horizontally and vertically.",
  },
  "single-candidate": {
    name: "Single Candidate",
    description: "Find cells with only one possible value.",
    instructions:
      "Identify the target cell and place the correct number to win.",
    example: "If a cell can only be 5, write 5 there.",
  },
  elimination: {
    name: "Elimination",
    description:
      "Eliminate possibilities in one box to reach a conclusion in another box.",
    instructions:
      "Identify the target cell and place the correct number to win.",
    example:
      "Where you can restrict the possibility of a number to a group of cells, you can use the certainty of it being in that group to eliminate it from somewhere else on the board.",
  },
  "missing-number": {
    name: "Missing Number",
    description: "Find the missing number in a nearly complete row.",
    instructions:
      "Fill in the missing number in the target cell. One other cell in the row is also blank, and the missing number appears elsewhere in the same column.",
  },
  "naked-pair": {
    name: "Naked Pair",
    description: "...",
    instructions: "...",
  },
};
