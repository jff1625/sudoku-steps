import { useState } from "preact/hooks";
import {
  cellCounts,
  eraserEnabled,
  hasIllegalCells,
  pencilEnabled,
  selectedNumber,
} from "../signals.ts";
import type {
  Board,
  CellCounts,
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
  const cell = board[colIdx][rowIdx];
  if (cell.value === "" || typeof cell.value !== "number") return false;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== colIdx && board[c][rowIdx].value === cell.value) return true;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== rowIdx && board[colIdx][r].value === cell.value) return true;
  }
  // Check box
  const boxRow = Math.floor(rowIdx / 3) * 3;
  const boxCol = Math.floor(colIdx / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (
        (r !== rowIdx || c !== colIdx) && board[c][r].value === cell.value
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
  return initialBoard[colIdx][rowIdx].value !== "";
}

function countCells(board: Board): CellCounts {
  const counts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
  for (const col of board) {
    for (const cell of col) {
      if (typeof cell.value === "number") {
        counts[cell.value]++;
      }
    }
  }
  return counts;
}

function hasAnyIllegalCell(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (isCellIllegal(board, row, col)) return true;
    }
  }
  return false;
}

export function SudokuGrid({
  initialBoard,
  gridRef,
}: SudokuGridProps) {
  const [board, setBoard] = useState<Board>(initialBoard);

  console.log("SudokuGrid render");

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
    setBoard((prev) => {
      const newBoard = prev.map((c, i) =>
        c.map((cell, j) => {
          if (i !== col || j !== row) return cell;
          const updated = { ...cell };
          if (value !== undefined) updated.value = value;
          if (props.pencilmarks !== undefined) {
            updated.pencilmarks = pencilmarks;
          }
          return updated;
        })
      ) as Board;
      // Update signals only when board changes
      cellCounts.value = countCells(newBoard);
      hasIllegalCells.value = hasAnyIllegalCell(newBoard);
      return newBoard;
    });
  };

  return (
    <table className="border-collapse" ref={gridRef}>
      <tbody>
        {[...Array(9)].map((_, rowIdx) => (
          <tr key={rowIdx}>
            {[...Array(9)].map((_, colIdx) => (
              <Cell
                key={`${colIdx}-${rowIdx}`}
                value={board[colIdx][rowIdx].value}
                pencilmarks={board[colIdx][rowIdx].pencilmarks}
                board={board}
                rowIdx={rowIdx}
                colIdx={colIdx}
                illegal={isCellIllegal(board, rowIdx, colIdx)}
                highlight={isCellHighlighted(
                  board[colIdx][rowIdx].value,
                  selectedNumber.value,
                )}
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
