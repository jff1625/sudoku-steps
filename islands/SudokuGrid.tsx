import type { Board, LockedGrid } from "../types/sudoku.ts";
import { forwardRef } from "preact/compat";

type SudokuGridProps = {
  board: Board;
  lockedCells: LockedGrid;
  selection: string | null;
  onCellClick: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, value: string) => void;
};

function isCellHighlighted(cell: string, selection: string | null) {
  return selection !== null && selection !== "eraser" && cell === selection;
}

function isCellIllegal(board: Board, rowIdx: number, colIdx: number): boolean {
  const cell = board[rowIdx][colIdx];
  if (!cell || !/^[1-9]$/.test(cell)) return false;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== colIdx && board[rowIdx][c] === cell) return true;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== rowIdx && board[r][colIdx] === cell) return true;
  }
  // Check box
  const boxRow = Math.floor(rowIdx / 3) * 3;
  const boxCol = Math.floor(colIdx / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== rowIdx || c !== colIdx) && board[r][c] === cell) return true;
    }
  }
  return false;
}

const SudokuGrid = forwardRef<HTMLTableElement, SudokuGridProps>(
  function SudokuGrid(
    {
      board,
      lockedCells,
      selection,
      onCellClick,
      onCellChange,
    },
    ref,
  ) {
    console.log("SudokuGrid render", selection);
    return (
      <table
        ref={ref}
        className="border-collapse"
      >
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                const highlighted = isCellHighlighted(cell, selection);
                const illegal = isCellIllegal(board, rowIdx, colIdx);

                function handleCellClickInternal() {
                  if (lockedCells[rowIdx][colIdx]) return;
                  if (selection === "eraser") {
                    onCellChange(rowIdx, colIdx, "");
                  } else if (selection !== null) {
                    onCellClick(rowIdx, colIdx);
                  }
                }

                return (
                  <td
                    key={colIdx}
                    className={[
                      "border border-gray-800 w-8 h-8 p-0 text-center align-middle",
                      illegal
                        ? "bg-red-200"
                        : highlighted
                        ? "bg-yellow-200"
                        : (Math.floor(rowIdx / 3) + Math.floor(colIdx / 3)) %
                              2 === 0
                        ? "bg-white"
                        : "bg-gray-100",
                      lockedCells[rowIdx][colIdx]
                        ? "cursor-default"
                        : selection
                        ? "cursor-pointer"
                        : "cursor-text",
                    ].join(" ")}
                    onClick={handleCellClickInternal}
                  >
                    <input
                      type="text"
                      value={cell}
                      maxLength={1}
                      className={[
                        "w-full h-full text-center border-none text-base bg-transparent focus:outline-none",
                        lockedCells[rowIdx][colIdx]
                          ? "font-bold text-black cursor-default"
                          : [
                            "font-normal text-gray-600",
                            selection && selection !== "eraser"
                              ? "cursor-pointer"
                              : "cursor-text",
                          ].join(" "),
                        // Only apply yellow highlight if not illegal
                        illegal
                          ? "bg-transparent"
                          : highlighted
                          ? "bg-yellow-200"
                          : "bg-transparent",
                      ].join(" ")}
                      readOnly={lockedCells[rowIdx][colIdx]}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement | null;
                        if (target) {
                          onCellChange(
                            rowIdx,
                            colIdx,
                            target.value.replace(/[^1-9]/, ""),
                          );
                        }
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);

export default SudokuGrid;
