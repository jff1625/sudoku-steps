import type { Board, CellUpdateProps } from "../types/sudoku.ts";
import { CellValue, PencilmarkValue } from "../types/sudoku.ts";

type CellProps = {
  value: CellValue;
  pencilmarks: PencilmarkValue[];
  board: Board;
  rowIdx: number;
  colIdx: number;
  illegal: boolean;
  highlight: boolean;
  locked: boolean;
  onCellChange: (props: CellUpdateProps) => void;
  selectedNumber: CellValue;
  pencilEnabled: boolean;
  eraserEnabled: boolean;
};

export function Cell(props: CellProps) {
  const {
    rowIdx,
    colIdx,
    value,
    pencilmarks,
    illegal,
    highlight,
    locked,
    selectedNumber,
    pencilEnabled,
    eraserEnabled,
  } = props;
  const hasPencilmarks = pencilmarks && pencilmarks.length > 0;

  // console.log("Cell", rowIdx, colIdx, value, selectedNumber);

  function handleCellClickInternal() {
    if (locked) return;
    let newValue = value;
    let newPencilmarks = pencilmarks;
    if (eraserEnabled) {
      newValue = "";
    } else if (
      selectedNumber !== ""
    ) {
      if (pencilEnabled) {
        if (pencilmarks.includes(selectedNumber)) {
          newPencilmarks = pencilmarks.filter((n) => n !== selectedNumber);
        } else {
          newPencilmarks = [...pencilmarks, selectedNumber];
        }
      } else {
        newValue = selectedNumber;
      }
    }

    console.log("handleCellClickInternal ", selectedNumber, value, newValue);
    props.onCellChange(
      {
        row: rowIdx,
        col: colIdx,
        value: newValue,
        pencilmarks: newPencilmarks,
      },
    );
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
      {hasPencilmarks && value === ""
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
              const n = (i + 1) as PencilmarkValue;
              return (
                <div
                  key={n}
                  className="flex items-center justify-center"
                  style={{ minHeight: 0, minWidth: 0 }}
                >
                  {pencilmarks.includes(n) ? n : ""}
                </div>
              );
            })}
          </div>
        )
        : (
          <input
            type="text"
            value={value}
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
                // Accept only 1-9, convert to number, or "" if empty/invalid
                const v = target.value.replace(/[^1-9]/g, "");
                props.onCellChange({
                  row: rowIdx,
                  col: colIdx,
                  value: v === "" ? "" : Number(v) as CellValue,
                  pencilmarks,
                });
              }
            }}
          />
        )}
    </td>
  );
}
