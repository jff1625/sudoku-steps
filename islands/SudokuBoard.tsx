import { h as _h } from "preact";
import { useState } from "preact/hooks";
import { BOARD_SIZE } from "../constants.ts";
import type {
  Board,
  CellValue,
  ImmutableGrid,
  Row,
  SudokuBoardProps,
} from "../types/sudoku.ts";
import { createEmptyBoard } from "../utils/sudokuGenerator.ts";

const SudokuBoard = ({ initialBoard }: SudokuBoardProps) => {
  const [board, setBoard] = useState<Board>(initialBoard || createEmptyBoard());
  const [immutableCells] = useState<ImmutableGrid>(() =>
    Array.from(
      { length: BOARD_SIZE },
      (_, row) =>
        Array.from({ length: BOARD_SIZE }, (_, col) =>
          initialBoard ? initialBoard[row][col] !== "" : false),
    ) as ImmutableGrid
  );

  const handleChange = (row: number, col: number, value: string) => {
    if (immutableCells[row][col]) return; // Prevent changes to immutable cells

    // Only allow digits 1-9 or empty
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell)) as Row<
          CellValue
        >
      ) as Board;
      setBoard(newBoard);
    }
  };

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        {board.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, colIdx) => (
              <td
                key={colIdx}
                style={{
                  border: "1px solid #333",
                  width: 32,
                  height: 32,
                  padding: 0,
                  textAlign: "center",
                  background:
                    (Math.floor(rowIdx / 3) + Math.floor(colIdx / 3)) % 2 === 0
                      ? "#fff"
                      : "#f0f0f0",
                }}
              >
                <input
                  type="text"
                  value={cell}
                  maxLength={1}
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    border: "none",
                    fontSize: 18,
                    background: "transparent",
                    fontWeight: immutableCells[rowIdx][colIdx]
                      ? "bold"
                      : "normal",
                    color: immutableCells[rowIdx][colIdx] ? "#000" : "#666",
                  }}
                  readOnly={immutableCells[rowIdx][colIdx]}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement | null;
                    if (target) {
                      handleChange(
                        rowIdx,
                        colIdx,
                        target.value.replace(/[^1-9]/, ""),
                      );
                    }
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SudokuBoard;
