export interface SudokuBoardProps {
  initialBoard?: Board;
}

export type SudokuGridProps = {
  initialBoard: Board;
  selectedNumber: CellValue;
  pencilEnabled: boolean;
  eraserEnabled: boolean;
};

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
  pencilmarks: Set<PencilmarkValue>;
};

export type CellValue = "" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type PencilmarkValue = Exclude<CellValue, "">;

export interface CellUpdateProps {
  row: number;
  col: number;
  value: CellValue;
  pencilmarks?: Set<PencilmarkValue>;
}
