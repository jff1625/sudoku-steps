import { useState } from "preact/hooks";
import {
  cellCounts,
  eraserEnabled,
  hasIllegalCells,
  pencilEnabled,
  selectedNumber,
  targetCellValue,
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
  x: number,
  y: number,
): boolean => {
  const cell = board[x][y];
  if (cell.value === "" || typeof cell.value !== "number") return false;

  // Check row (y)
  for (let xx = 0; xx < 9; xx++) {
    if (xx !== x && board[xx][y].value === cell.value) return true;
  }
  // Check column (x)
  for (let yy = 0; yy < 9; yy++) {
    if (yy !== y && board[x][yy].value === cell.value) return true;
  }
  // Check box
  const boxY = Math.floor(y / 3) * 3;
  const boxX = Math.floor(x / 3) * 3;
  for (let yy = boxY; yy < boxY + 3; yy++) {
    for (let xx = boxX; xx < boxX + 3; xx++) {
      if (
        (yy !== y || xx !== x) && board[xx][yy].value === cell.value
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
  x: number,
  y: number,
  initialBoard?: Board,
): boolean {
  if (!initialBoard) return false;
  return initialBoard[x][y].value !== "";
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
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (isCellIllegal(board, x, y)) return true;
    }
  }
  return false;
}

export function SudokuGrid({
  initialBoard,
  gridRef,
  targetCell,
}: SudokuGridProps) {
  const [board, setBoard] = useState<Board>(initialBoard);

  console.log("SudokuGrid render");

  // Accepts an object with optional value and pencilmarks
  const handleCellChange = (
    props: CellUpdateProps,
  ) => {
    const {
      x,
      y,
      value,
      pencilmarks,
    } = props;
    setBoard((prev) => {
      const newBoard = prev.map((col, xx) =>
        col.map((cell, yy) => {
          if (xx !== x || yy !== y) return cell;
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

    if (targetCell && targetCell.x === x && targetCell.y === y) {
      targetCellValue.value = value;
    }
  };

  return (
    <table className="border-collapse" ref={gridRef}>
      <tbody>
        {[...Array(9)].map((_, y) => (
          <tr key={y}>
            {[...Array(9)].map((_, x) => (
              <Cell
                key={`${x}-${y}`}
                value={board[x][y].value}
                pencilmarks={board[x][y].pencilmarks}
                board={board}
                x={x}
                y={y}
                illegal={isCellIllegal(board, x, y)}
                highlight={isCellHighlighted(
                  board[x][y].value,
                  selectedNumber.value,
                )}
                locked={isCellLocked(x, y, initialBoard)}
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
