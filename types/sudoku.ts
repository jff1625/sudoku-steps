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
  pencilmarks: PencilmarkValue[];
};

export type SudokuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CellValue = "" | SudokuNumbers;

export type PencilmarkValue = SudokuNumbers;

export type CellUpdateProps = CellData & CellCoords;

export interface CellCoords {
  x: number;
  y: number;
}

export type CellCounts = Record<number, number>;

export interface ScanPracticeParams {
  x?: number;
  y?: number;
  targetValue?: CellValue;
  order?: "increasing" | "decreasing";
  scanDirection?: "horizontal" | "vertical";
}

export type GameMode =
  | "normal"
  | "band";
// | "band-2d"
// | "single-candidate"
// | "row";
