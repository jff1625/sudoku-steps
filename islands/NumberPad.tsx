import { useEffect, useRef } from "preact/hooks";
import { CellValue } from "../types/sudoku.ts";

type NumberPadProps = {
  onSelect: (num: CellValue, pencil: boolean, eraser: boolean) => void;
  selectedNumber: CellValue;
  pencilEnabled: boolean;
  eraserEnabled: boolean;
  gridRef?: preact.RefObject<HTMLElement>;
};

export const NumberPad = (
  { onSelect, selectedNumber, pencilEnabled, eraserEnabled, gridRef }:
    NumberPadProps,
) => {
  const numbers: CellValue[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current && containerRef.current.contains(target)) return;
      if (gridRef && gridRef.current && gridRef.current.contains(target)) {
        return;
      }
      // Deselect everything
      if (selectedNumber !== null || pencilEnabled) {
        onSelect("", false, false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedNumber, pencilEnabled, onSelect, gridRef]);

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", gap: 8, margin: "16px 0" }}
    >
      <button
        type="button"
        style={{
          width: 32,
          height: 32,
          fontSize: 18,
          fontWeight: "bold",
          borderRadius: 4,
          border: pencilEnabled ? "2px solid #3b82f6" : "1px solid #ccc",
          background: pencilEnabled ? "#dbeafe" : "#fff",
          color: "#222",
          cursor: "pointer",
        }}
        title="Pencil"
        onClick={() => onSelect(selectedNumber, !pencilEnabled, !eraserEnabled)}
      >
        ✏️
      </button>
      {numbers.map((num) => (
        <button
          key={num}
          type="button"
          style={{
            width: 32,
            height: 32,
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 4,
            border: selectedNumber === num
              ? "2px solid #22c55e"
              : "1px solid #ccc",
            background: selectedNumber === num ? "#bbf7d0" : "#fff",
            color: "#222",
            cursor: "pointer",
          }}
          onClick={() =>
            onSelect(selectedNumber === num ? "" : num, pencilEnabled, false)}
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        style={{
          width: 32,
          height: 32,
          fontSize: 18,
          fontWeight: "bold",
          borderRadius: 4,
          border: eraserEnabled ? "2px solid #22c55e" : "1px solid #ccc",
          background: eraserEnabled ? "#bbf7d0" : "#fff",
          color: "#222",
          cursor: "pointer",
        }}
        title="Eraser"
        onClick={() => onSelect("", false, true)}
      >
        🧹
      </button>
    </div>
  );
};
