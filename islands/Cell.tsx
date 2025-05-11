import type {
  Board,
  CellUpdateProps,
  CellValue,
  PencilmarkValue,
} from "../types/sudoku.ts";
import {
  cellInputNumber,
  highlightNumber,
  padSelectedNumber,
} from "../signals.ts";

type CellProps = {
  value: CellValue;
  pencilmarks: PencilmarkValue[];
  board: Board;
  x: number;
  y: number;
  illegal: boolean;
  highlight: boolean;
  locked: boolean;
  onCellChange: (props: CellUpdateProps) => void;
  pencilEnabled: boolean;
  eraserEnabled: boolean;
};

export const Cell = (props: CellProps) => {
  const {
    x,
    y,
    value,
    pencilmarks,
    illegal,
    highlight,
    locked,
    pencilEnabled,
    eraserEnabled,
  } = props;
  const hasPencilmarks = pencilmarks && pencilmarks.length > 0;

  // Handle cell click event
  function handleCellClickInternal() {
    if (locked) return;
    let newValue = value;
    let newPencilmarks = pencilmarks;
    // For pad/click entry, use padSelectedNumber
    const selectedNumber = padSelectedNumber.value;
    if (eraserEnabled) {
      newValue = "";
    } else if (selectedNumber !== "") {
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
    props.onCellChange({
      x,
      y,
      value: newValue,
      pencilmarks: newPencilmarks,
    });
    // Set highlightNumber to padSelectedNumber after pad/click entry
    highlightNumber.value = padSelectedNumber.value;
  }

  return (
    <td
      key={x}
      className={[
        "w-8 h-8 p-0 text-center align-middle",
        y % 3 === 0 ? "border-t-2 border-gray-800" : "border-t border-gray-800",
        x % 3 === 0 ? "border-l-2 border-gray-800" : "border-l border-gray-800",
        y === 8 ? "border-b-2 border-gray-800" : "",
        x === 8 ? "border-r-2 border-gray-800" : "",
        illegal && !hasPencilmarks
          ? "bg-red-200"
          : highlight && !hasPencilmarks
          ? "bg-blue-200"
          : (Math.floor(y / 3) + Math.floor(x / 3)) % 2 === 0
          ? "bg-white"
          : "bg-gray-100",
        locked
          ? "cursor-default"
          : (eraserEnabled || pencilEnabled || padSelectedNumber.value)
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
            inputMode="numeric"
            pattern="[1-9]"
            className={[
              "w-full h-full text-center border-none text-base bg-transparent focus:outline-none",
              locked ? "font-bold text-black cursor-default" : [
                "font-normal text-gray-600",
                (eraserEnabled || pencilEnabled || padSelectedNumber.value)
                  ? "cursor-pointer"
                  : "cursor-text",
              ].join(" "),
            ].join(" ")}
            readOnly={locked}
            onFocus={() => {
              cellInputNumber.value = value;
              highlightNumber.value = value;
            }}
            onBlur={() => {
              cellInputNumber.value = "";
              highlightNumber.value = padSelectedNumber.value;
            }}
            onBeforeInput={(e) => {
              // Allow direct overwrite: if a number key is pressed, replace value
              const input = (e as InputEvent).data;
              if (input && /^[1-9]$/.test(input)) {
                e.preventDefault();
                props.onCellChange({
                  x,
                  y,
                  value: Number(input) as CellValue,
                  pencilmarks,
                });
                cellInputNumber.value = Number(input) as CellValue;
                highlightNumber.value = Number(input) as CellValue;
              }
            }}
            onChange={(e) => {
              const target = e.target as HTMLInputElement | null;
              if (target) {
                // Accept only 1-9, convert to number, or "" if empty/invalid
                const v = target.value.replace(/[^1-9]/g, "");
                props.onCellChange({
                  x,
                  y,
                  value: v === "" ? "" : Number(v) as CellValue,
                  pencilmarks,
                });
                cellInputNumber.value = v === "" ? "" : Number(v) as CellValue;
                highlightNumber.value = v === ""
                  ? padSelectedNumber.value
                  : Number(v) as CellValue;
              }
            }}
          />
        )}
    </td>
  );
};
