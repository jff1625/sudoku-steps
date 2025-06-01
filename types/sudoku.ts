import type { RefObject } from "preact";

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

export type CellData = {
  value: CellValue;
  pencilmarks: SudokuNumbers[];
};

export type SudokuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CellValue = "" | SudokuNumbers;

export type CellUpdateProps = CellData & CellCoords;

export interface CellCoords {
  x: number;
  y: number;
}

export type CellCounts = Record<number, number>;

export type GameMode =
  | "normal"
  | "band"
  | "band-2d"
  | "single-candidate"
  | "elimination"
  | "missing-number";

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

export type NormalParams = Record<string, never>;
