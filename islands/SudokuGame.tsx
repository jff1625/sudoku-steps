import { h as _h } from "preact";
import { useRef, useState } from "preact/hooks";
import { BOARD_SIZE } from "../constants.ts";
import type {
  Board,
  CellValue,
  LockedGrid,
  Row,
  SudokuBoardProps,
} from "../types/sudoku.ts";
import { createEmptyBoard } from "../utils/sudokuGenerator.ts";
import NumberPad from "./NumberPad.tsx";
import SudokuGrid from "./SudokuGrid.tsx";

const SudokuGame = ({ initialBoard }: SudokuBoardProps) => {
  const [board, setBoard] = useState<Board>(initialBoard || createEmptyBoard());
  const [lockedCells] = useState<LockedGrid>(() =>
    Array.from(
      { length: BOARD_SIZE },
      (_, row) =>
        Array.from({ length: BOARD_SIZE }, (_, col) =>
          initialBoard ? initialBoard[row][col] !== "" : false),
    ) as LockedGrid
  );
  const [selection, setSelection] = useState<string | null>(null);
  const gridRef = useRef<HTMLTableElement>(null);

  const handleChange = (row: number, col: number, value: string) => {
    if (lockedCells[row][col]) return;
    console.log("handleChange", row, col, value);
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell)) as Row<
          CellValue
        >
      ) as Board;
      setBoard(newBoard);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (lockedCells[row][col]) return;
    if (selection) {
      console.log("handleCellClick", row, col, selection);
      handleChange(row, col, selection);
    }
  };

  return (
    <div>
      <SudokuGrid
        ref={gridRef}
        board={board}
        lockedCells={lockedCells}
        selection={selection}
        onCellClick={handleCellClick}
        onCellChange={handleChange}
      />
      <NumberPad
        selected={selection}
        onSelect={setSelection}
        gridRef={gridRef}
      />
    </div>
  );
};

export default SudokuGame;
