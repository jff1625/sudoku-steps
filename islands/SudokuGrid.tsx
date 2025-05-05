import { useState } from "preact/hooks";
import { eraserEnabled, pencilEnabled, selectedNumber } from "../signals.ts";
import type {
  Board,
  CellData,
  CellUpdateProps,
  CellValue,
  SudokuGridProps,
} from "../types/sudoku.ts";
import { Cell } from "./Cell.tsx";

const isCellIllegal = (
  board: Board,
  rowIdx: number,
  colIdx: number,
): boolean => {
  const cell = board[rowIdx][colIdx];
  if (cell.value === "" || typeof cell.value !== "number") return false;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== colIdx && board[rowIdx][c].value === cell.value) return true;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== rowIdx && board[r][colIdx].value === cell.value) return true;
  }
  // Check box
  const boxRow = Math.floor(rowIdx / 3) * 3;
  const boxCol = Math.floor(colIdx / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (
        (r !== rowIdx || c !== colIdx) && board[r][c].value === cell.value
      ) return true;
    }
  }
  return false;
};

const isCellHighlighted = (
  cellValue: CellValue,
  selectedNumber: CellValue,
): boolean => {
  if (selectedNumber === "") return false;
  return cellValue === selectedNumber;
};

function isCellLocked(
  rowIdx: number,
  colIdx: number,
  initialBoard?: Board,
): boolean {
  if (!initialBoard) return false;
  return initialBoard[rowIdx][colIdx].value !== "";
}

export function SudokuGrid({
  initialBoard,
  gridRef,
}: SudokuGridProps) {
  const [board, setBoard] = useState<Board>(initialBoard);

  // console.log("Grid", selectedNumber);

  // Accepts an object with optional value and pencilmarks
  const handleCellChange = (
    props: CellUpdateProps,
  ) => {
    const {
      row,
      col,
      value,
      pencilmarks,
    } = props;
    setBoard((prev) =>
      prev.map((r, i) =>
        r.map((cell, j) => {
          if (i !== row || j !== col) return cell;
          const updated = { ...cell };
          if (value !== undefined) updated.value = value;
          if (props.pencilmarks !== undefined) {
            updated.pencilmarks = pencilmarks;
          }
          return updated;
        })
      ) as Board
    );
  };

  return (
    <table className="border-collapse" ref={gridRef}>
      <tbody>
        {board.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell: CellData, colIdx) => (
              <Cell
                key={`${colIdx}-${rowIdx}`}
                value={cell.value}
                pencilmarks={cell.pencilmarks}
                board={board}
                rowIdx={rowIdx}
                colIdx={colIdx}
                illegal={isCellIllegal(board, rowIdx, colIdx)}
                highlight={isCellHighlighted(cell.value, selectedNumber.value)}
                locked={isCellLocked(rowIdx, colIdx, initialBoard)}
                onCellChange={handleCellChange}
                selectedNumber={selectedNumber.value}
                pencilEnabled={pencilEnabled.value}
                eraserEnabled={eraserEnabled.value}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
