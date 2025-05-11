import type { GameMode } from "./types/sudoku.ts";

export const BOARD_SIZE = 9;

export const GAME_MODES: GameMode[] = [
  "normal",
  "band",
  "band-2d",
  "single-candidate",
];

export const GAME_MODE_DETAILS: Record<
  GameMode,
  { name: string; description: string; example?: string }
> = {
  normal: {
    name: "Normal",
    description:
      "Standard Sudoku rules apply: fill each row, column, and box with the numbers 1-9 without repetition.",
    example:
      "Each number 1-9 must appear exactly once in every row, column, and 3x3 box.",
  },
  band: {
    name: "Band",
    description:
      "A special mode or constraint involving bands (groups of rows or columns).",
    example:
      "For example, a band may require certain numbers to appear only within a specific set of rows.",
  },
  "band-2d": {
    name: "Band 2D",
    description:
      "A two-dimensional band constraint, possibly involving both rows and columns.",
    example:
      "Numbers may be restricted to certain bands both horizontally and vertically.",
  },
  "single-candidate": {
    name: "Single Candidate",
    description: "Find cells with only one possible value.",
    example: "If a cell can only be 5, write 5 there.",
  },
};
