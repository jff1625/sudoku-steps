export interface SudokuGameProps {
  initialBoard?: Board;
}

export interface SudokuGridProps {
  initialBoard: Board;
  gridRef: preact.RefObject<HTMLTableElement>;
}

export type Board = Grid<CellData>;

export type Grid<T> = [
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
  Row<T>,
];

export type Row<T> = [T, T, T, T, T, T, T, T, T];

export type CellData = {
  value: CellValue;
  pencilmarks: PencilmarkValue[];
};

export type CellValue = "" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type PencilmarkValue = Exclude<CellValue, "">;

export interface CellUpdateProps extends CellData {
  row: number;
  col: number;
}
