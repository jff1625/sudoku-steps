import type { Board } from "../types/sudoku.ts";
import { CellValue, PencilmarkValue } from "../types/sudoku.ts";

type CellProps = {
  number: CellValue;
  pencilmarks: Set<PencilmarkValue>;
  board: Board;
  rowIdx: number;
  colIdx: number;
  illegal: boolean;
  highlight: boolean;
  locked: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, value: string) => void;
  selectedNumber: CellValue;
  pencilEnabled: boolean;
  eraserEnabled: boolean;
};

export function CellComponent(props: CellProps) {
  const {
    rowIdx,
    colIdx,
    number,
    pencilmarks,
    illegal,
    highlight,
    locked,
    onCellClick,
    onCellChange,
    selectedNumber,
    pencilEnabled,
    eraserEnabled,
  } = props;
  const hasPencilmarks = pencilmarks && pencilmarks.size > 0;

  function handleCellClickInternal() {
    if (locked) return;
    if (eraserEnabled) {
      onCellChange(rowIdx, colIdx, "");
    } else if (
      pencilEnabled && selectedNumber && /^[1-9]$/.test(selectedNumber)
    ) {
      // Toggle pencilmark for this cell/number
      const newPencilmarks = new Set(pencilmarks);
      if (newPencilmarks.has(selectedNumber)) {
        newPencilmarks.delete(selectedNumber);
      } else {
        newPencilmarks.add(selectedNumber);
      }
      // Use a special string to indicate pencilmark change
      onCellChange(
        rowIdx,
        colIdx,
        "__PENCIL__:" +
          Array.from(newPencilmarks).sort().join(""),
      );
    } else if (selectedNumber !== null) {
      onCellClick(rowIdx, colIdx);
    }
  }

  return (
    <td
      key={colIdx}
      className={[
        "w-8 h-8 p-0 text-center align-middle",
        rowIdx % 3 === 0
          ? "border-t-2 border-gray-800"
          : "border-t border-gray-800",
        colIdx % 3 === 0
          ? "border-l-2 border-gray-800"
          : "border-l border-gray-800",
        rowIdx === 8 ? "border-b-2 border-gray-800" : "",
        colIdx === 8 ? "border-r-2 border-gray-800" : "",
        illegal && !hasPencilmarks
          ? "bg-red-200"
          : highlight && !hasPencilmarks
          ? "bg-blue-200"
          : (Math.floor(rowIdx / 3) + Math.floor(colIdx / 3)) % 2 === 0
          ? "bg-white"
          : "bg-gray-100",
        locked
          ? "cursor-default"
          : (eraserEnabled || selectedNumber || pencilEnabled)
          ? "cursor-pointer"
          : "cursor-text",
      ].join(" ")}
      onClick={handleCellClickInternal}
    >
      {hasPencilmarks && number === ""
        ? (
          <div
            className="w-full h-full grid grid-cols-3 grid-rows-3"
            style={{
              fontSize: "0.55rem",
              color: "#555",
              lineHeight: 1.1,
            }}
          >
            {Array.from({ length: 9 }, (_, i) => {
              const n = (i + 1).toString() as PencilmarkValue;
              return (
                <div
                  key={n}
                  className="flex items-center justify-center"
                  style={{ minHeight: 0, minWidth: 0 }}
                >
                  {pencilmarks.has(n) ? n : ""}
                </div>
              );
            })}
          </div>
        )
        : (
          <input
            type="text"
            value={number}
            maxLength={1}
            className={[
              "w-full h-full text-center border-none text-base bg-transparent focus:outline-none",
              locked ? "font-bold text-black cursor-default" : [
                "font-normal text-gray-600",
                (eraserEnabled ||
                    selectedNumber ||
                    pencilEnabled)
                  ? "cursor-pointer"
                  : "cursor-text",
              ].join(" "),
            ].join(" ")}
            readOnly={locked}
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
        )}
    </td>
  );
}

// Rename export for usage elsewhere
export { CellComponent as Cell };
