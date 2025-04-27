export const BOARD_SIZE = 9;

export type CellValue =
  | ""
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type Row<T> = [T, T, T, T, T, T, T, T, T];
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

export type Board = Grid<CellValue>;
export type LockedGrid = Grid<boolean>;

export interface SudokuBoardProps {
  initialBoard?: Board;
}
