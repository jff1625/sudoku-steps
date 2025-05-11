import {
  cellCounts,
  eraserEnabled,
  highlightNumber,
  padSelectedNumber,
  pencilEnabled,
} from "../signals.ts";
import { useEffect, useRef } from "preact/hooks";
import type { SudokuNumbers } from "../types/sudoku.ts";

type NumberPadProps = {
  gridRef: preact.RefObject<HTMLTableElement>;
};

export const NumberPad = (
  { gridRef }: NumberPadProps,
) => {
  const numbers: SudokuNumbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current && containerRef.current.contains(target)) return;
      if (gridRef && gridRef.current && gridRef.current.contains(target)) {
        return;
      }
      // Deselect everything
      if (padSelectedNumber.value !== "" || pencilEnabled.value) {
        padSelectedNumber.value = "";
        pencilEnabled.value = false;
        eraserEnabled.value = false;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    1;
    function handlePadKeyboard(e: KeyboardEvent) {
      // Only handle if no cell is focused for text entry
      const active = document.activeElement;
      // If a cell or input is focused, do not trigger pad logic
      if (
        active &&
        (active.tagName === "INPUT" ||
          (gridRef.current && gridRef.current.contains(active)))
      ) {
        return;
      }
      // Number keys 1-9
      if (/^[1-9]$/.test(e.key)) {
        const num = parseInt(e.key, 10) as SudokuNumbers;
        padSelectedNumber.value = padSelectedNumber.value === num ? "" : num;
        highlightNumber.value = padSelectedNumber.value;
        eraserEnabled.value = false;
      }
      // Backspace or Delete for eraser
      if (e.key === "Backspace" || e.key === "Delete") {
        eraserEnabled.value = !eraserEnabled.value;
        pencilEnabled.value = false;
        padSelectedNumber.value = "";
        e.preventDefault();
      }
      // 'p' for pencil toggle
      if (e.key === "p" || e.key === "P") {
        pencilEnabled.value = !pencilEnabled.value;
        eraserEnabled.value = false;
        e.preventDefault();
      }
    }
    globalThis.addEventListener("keydown", handlePadKeyboard);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      globalThis.removeEventListener("keydown", handlePadKeyboard);
    };
  }, [gridRef]);

  return (
    <div
      ref={containerRef}
      class="flex flex-wrap sm:flex-nowrap justify-center items-center mx-auto gap-y-2 mt-4 mb-2"
    >
      <button
        type="button"
        class={`w-8 h-8 text-lg font-bold rounded mx-1 my-1 ${
          pencilEnabled.value
            ? "border-2 border-blue-500 bg-blue-100"
            : "border border-gray-300 bg-white"
        } text-gray-900 cursor-pointer flex items-center justify-center`}
        title="Pencil"
        aria-pressed={pencilEnabled.value}
        onClick={() => {
          pencilEnabled.value = !pencilEnabled.value;
          eraserEnabled.value = false;
        }}
      >
        ✏️
      </button>
      {numbers.map((num) => {
        const usedUp: boolean = cellCounts.value[num] >= 9;
        return (
          <button
            key={num.toString()}
            type="button"
            class={`w-8 h-8 text-lg font-bold rounded relative mx-1 my-1 ${
              padSelectedNumber.value === num
                ? "border-2 border-green-500 bg-green-100"
                : "border border-gray-300 bg-white"
            } text-gray-900 cursor-pointer flex items-center justify-center`}
            aria-pressed={padSelectedNumber.value === num}
            onClick={() => {
              padSelectedNumber.value = padSelectedNumber.value === num
                ? ""
                : num;
              highlightNumber.value = padSelectedNumber.value;
              eraserEnabled.value = false;
            }}
            // disabled={usedUp}
            style={{ position: "relative" }}
          >
            <span className="relative z-10">{num}</span>
            {usedUp && (
              <span className="
              absolute 
              left-1/4 right-1/4 
              top-1/2 
              border-t-2 
              border-gray-900 
              rotate-[-20deg] 
              z-20 
            " />
            )}
          </button>
        );
      })}
      <button
        type="button"
        class={`w-8 h-8 text-lg font-bold rounded mx-1 my-1 ${
          eraserEnabled.value
            ? "border-2 border-green-500 bg-green-100"
            : "border border-gray-300 bg-white"
        } text-gray-900 cursor-pointer flex items-center justify-center`}
        title="Eraser"
        aria-pressed={eraserEnabled.value}
        onClick={() => {
          eraserEnabled.value = true;
          pencilEnabled.value = false;
          padSelectedNumber.value = "";
        }}
      >
        🧹
      </button>
    </div>
  );
};
