import type { RefObject } from "preact";
import { GAME_MODES } from "../constants/constants.ts";

export type GameMode = typeof GAME_MODES[number];

export interface SudokuGameProps {
  gameMode: GameMode;
}

export interface SudokuGridProps {
  initialBoard: Board;
  gridRef: RefObject<HTMLTableElement>;
  targetCell: CellCoords | null;
}

export type Board = Grid<CellData>;

// Outer array is columns, inner array is rows
export type Grid<T> = [
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
  Col<T>,
];
export type Col<T> = [T, T, T, T, T, T, T, T, T];

export type CellData = CellCoords & {
  value: CellValue;
  pencilmarks: SudokuNumbers[];
};

export type SudokuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CellValue = "" | SudokuNumbers;

export interface CellCoords {
  x: number;
  y: number;
}

export type CellCounts = Record<number, number>;

export type ExampleOverlay =
  | { type: "circle"; cell: CellCoords; color?: string }
  | { type: "line"; from: CellCoords; to: CellCoords; color?: string }
  | { type: "text"; cell: CellCoords; text: string; color?: string }
  | {
    type: "pencilmark";
    cell: CellCoords;
    value: SudokuNumbers[];
    color?: string;
  };

export interface ExampleStep {
  overlays: ExampleOverlay[];
  description?: string;
}

export interface ExampleBoard {
  board: Board;
  steps: ExampleStep[];
}

export type ExampleSequence = ExampleStep[];

export type PracticeBoardOrientation = "horizontal" | "vertical";

export interface PracticeBoardParams {
  x?: number;
  y?: number;
  targetValue?: SudokuNumbers;
  orientation?: PracticeBoardOrientation;
}

export interface BandPracticeParams extends PracticeBoardParams {
  order?: "increasing" | "decreasing";
}

export interface Box {
  index: number;
  cells: CellData[];
  rows: number[];
  columns: number[];
}
