import { h } from "preact";
import { useState } from "preact/hooks";

const BOARD_SIZE = 9;

function createEmptyBoard() {
  return Array.from(
    { length: BOARD_SIZE },
    () => Array.from({ length: BOARD_SIZE }, () => ""),
  );
}

const SudokuBoard = () => {
  const [board, setBoard] = useState<string[][]>(createEmptyBoard());

  const handleChange = (row: number, col: number, value: string) => {
    // Only allow digits 1-9 or empty
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell))
      );
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
                  }}
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
