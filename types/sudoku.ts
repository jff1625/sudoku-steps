import type { RefObject } from "preact";

export interface SudokuGameProps {
  initialBoard?: Board;
}

export interface SudokuGridProps {
  initialBoard: Board;
  gridRef: RefObject<HTMLTableElement>;
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

export type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CellValue = "" | Numbers;

export type PencilmarkValue = Numbers;

export interface CellUpdateProps extends CellData {
  row: number;
  col: number;
}

export type CellCounts = Record<number, number>;

export interface ScanPracticeParams {
  x?: number;
  y?: number;
  targetValue?: CellValue;
  order?: "increasing" | "decreasing";
  scanDirection?: "horizontal" | "vertical";
}
