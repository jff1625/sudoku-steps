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

export interface GeneratorParams {
  x?: number;
  y?: number;
  targetValue?: CellValue;
}

export interface BandParams extends GeneratorParams {
  order?: "increasing" | "decreasing";
  scanDirection?: "horizontal" | "vertical";
}

export type GameMode =
  | "normal"
  | "band"
  | "band-2d"
  | "single-candidate"
  | "mock-1"
  | "mock-2"
  | "mock-3"
  | "mock-4"
  | "mock-5"
  | "mock-6";

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
