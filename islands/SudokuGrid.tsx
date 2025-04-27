import { useState } from "preact/hooks";
import type { Board, CellData, SudokuGridProps } from "../types/sudoku.ts";
import { Cell } from "./Cell.tsx";

const isCellIllegal = (
  board: Board,
  rowIdx: number,
  colIdx: number,
): boolean => {
  const cell = board[rowIdx][colIdx];
  if (!cell.number || !/^[1-9]$/.test(cell.number)) return false;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== colIdx && board[rowIdx][c].number === cell.number) return true;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== rowIdx && board[r][colIdx].number === cell.number) return true;
  }
  // Check box
  const boxRow = Math.floor(rowIdx / 3) * 3;
  const boxCol = Math.floor(colIdx / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (
        (r !== rowIdx || c !== colIdx) && board[r][c].number === cell.number
      ) return true;
    }
  }
  return false;
};

const isCellHighlighted = (
  cellValue: string,
  selectedNumber: string | null,
): boolean => {
  return cellValue === selectedNumber;
};

function isCellLocked(
  rowIdx: number,
  colIdx: number,
  initialBoard?: Board,
): boolean {
  if (!initialBoard) return false;
  return initialBoard[rowIdx][colIdx].number !== "";
}

export function SudokuGrid({
  initialBoard,
  selectedNumber,
  pencilEnabled,
  eraserEnabled,
}: SudokuGridProps) {
  const [board, setBoard] = useState<Board>(initialBoard);

  const handleCellClick = (row: number, col: number) => {
    if (selectedNumber) {
      handleChange(row, col, selectedNumber);
    }
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    // Implement your cell update logic here, e.g.:
    // - Update number or pencilmarks
    // - Handle eraser/pencil logic
    // - Call onCellChange if you want to notify parent
    // Example for number update:
    setBoard((prev) =>
      prev.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? { ...cell, number: value } : cell
        ) as typeof r
      ) as Board
    );
    if (onCellChange) onCellChange(row, col, value);
  };

  return (
    <table className="border-collapse">
      <tbody>
        {board.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell: CellData, colIdx) => (
              <Cell
                key={colIdx}
                number={cell.number}
                pencilmarks={cell.pencilmarks}
                board={board}
                rowIdx={rowIdx}
                colIdx={colIdx}
                illegal={isCellIllegal(board, rowIdx, colIdx)}
                highlight={isCellHighlighted(cell.number, selectedNumber)}
                locked={isCellLocked(rowIdx, colIdx, initialBoard)}
                onCellClick={handleCellClick}
                onCellChange={handleCellChange}
                selectedNumber={selectedNumber}
                pencilEnabled={pencilEnabled}
                eraserEnabled={eraserEnabled}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
