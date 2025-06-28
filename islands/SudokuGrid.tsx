import { useState } from "preact/hooks";
import type {
  Board,
  CellCounts,
  CellData,
  CellValue,
  ExampleOverlay,
  SudokuGridProps,
} from "../types/sudoku.ts";
import {
  cellCounts,
  eraserEnabled,
  hasIllegalCells,
  highlightNumber,
  pencilEnabled,
  targetCellValue,
} from "../signals.ts";
import { Cell } from "./Cell.tsx";
import { forEachCell } from "../generators/utils/forEachCell.ts";

/**
 * Returns true if the cell at (x, y) is illegal (duplicate in row, col, or box)
 */
const isCellIllegal = (
  board: Board,
  x: number,
  y: number,
): boolean => {
  const cell = board[x][y];
  if (cell.value === "" || typeof cell.value !== "number") return false;
  for (let xx = 0; xx < 9; xx++) {
    if (xx !== x && board[xx][y].value === cell.value) return true;
  }
  for (let yy = 0; yy < 9; yy++) {
    if (yy !== y && board[x][yy].value === cell.value) return true;
  }
  const boxY = Math.floor(y / 3) * 3;
  const boxX = Math.floor(x / 3) * 3;
  for (let yy = boxY; yy < boxY + 3; yy++) {
    for (let xx = boxX; xx < boxX + 3; xx++) {
      if ((yy !== y || xx !== x) && board[xx][yy].value === cell.value) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Returns true if the cell should be highlighted (matches highlightNumber)
 */
const isCellHighlighted = (
  cellValue: CellValue,
  _x: number,
  _y: number,
): boolean => {
  if (highlightNumber.value === "") return false;
  return cellValue === highlightNumber.value;
};

/**
 * Returns true if the cell at (x, y) is locked (part of the initial puzzle)
 */
const isCellLocked = (
  x: number,
  y: number,
  initialBoard?: Board,
): boolean => {
  if (!initialBoard) return false;
  return initialBoard[x][y].value !== "";
};

/**
 * Counts the number of each digit in the board
 */
const countCells = (board: Board): CellCounts => {
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
  forEachCell((x, y) => {
    if (typeof board[x][y].value === "number") {
      counts[board[x][y].value as number]++;
    }
  });
  return counts;
};

/**
 * Returns true if any cell in the board is illegal
 */
const hasAnyIllegalCell = (board: Board): boolean => {
  let found = false;
  forEachCell((x, y) => {
    if (!found && isCellIllegal(board, x, y)) found = true;
  });
  return found;
};

export const SudokuGrid = (
  { initialBoard, gridRef, targetCell }: SudokuGridProps & {
    overlays?: ExampleOverlay[];
  },
) => {
  const [board, setBoard] = useState<Board>(initialBoard);

  const handleCellChange = (props: CellData) => {
    const { x, y, value, pencilmarks } = props;
    setBoard((prev) => {
      const newBoard = prev.map((col, xx) =>
        col.map((cell, yy) => {
          if (xx !== x || yy !== y) return cell;
          const updated = { ...cell };
          if (value !== undefined) updated.value = value;
          if (pencilmarks !== undefined) updated.pencilmarks = pencilmarks;
          return updated;
        })
      ) as Board;
      cellCounts.value = countCells(newBoard);
      hasIllegalCells.value = hasAnyIllegalCell(newBoard);
      return newBoard;
    });
    if (targetCell && targetCell.x === x && targetCell.y === y) {
      targetCellValue.value = value;
    }
  };

  return (
    <div class="relative w-fit h-fit">
      <table className="border-collapse relative z-0" ref={gridRef}>
        <tbody>
          {Array.from({ length: 9 }).map((_, y) => (
            <tr key={y}>
              {Array.from({ length: 9 }).map((_, x) => (
                <Cell
                  key={`${x}-${y}`}
                  value={board[x][y].value}
                  pencilmarks={board[x][y].pencilmarks}
                  board={board}
                  x={x}
                  y={y}
                  illegal={isCellIllegal(board, x, y)}
                  highlight={isCellHighlighted(board[x][y].value, x, y)}
                  locked={isCellLocked(x, y, initialBoard)}
                  onCellChange={handleCellChange}
                  pencilEnabled={pencilEnabled.value}
                  eraserEnabled={eraserEnabled.value}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
