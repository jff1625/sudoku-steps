import type { GameMode } from "./types/sudoku.ts";

export const BOARD_SIZE = 9;

export const GAME_MODES: GameMode[] = [
  "normal",
  "band",
  "band-2d",
  "single-candidate",
  "mock-1",
  "mock-2",
  "mock-3",
  "mock-4",
  "mock-5",
  "mock-6",
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
    name: "Single Band",
    description:
      "A special mode or constraint involving bands (groups of rows or columns).",
    example:
      "For example, a band may require certain numbers to appear only within a specific set of rows.",
  },
  "band-2d": {
    name: "Two Bands",
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
  "mock-1": {
    name: "Mock Mode 1",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 1.",
  },
  "mock-2": {
    name: "Mock Mode 2",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 2.",
  },
  "mock-3": {
    name: "Mock Mode 3",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 3.",
  },
  "mock-4": {
    name: "Mock Mode 4",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 4.",
  },
  "mock-5": {
    name: "Mock Mode 5",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 5.",
  },
  "mock-6": {
    name: "Mock Mode 6",
    description: "This is a mock mode for UI testing.",
    example: "Example for mock mode 6.",
  },
};
