import {
  cellCounts,
  eraserEnabled,
  pencilEnabled,
  selectedNumber,
} from "../signals.ts";
import { useEffect, useRef } from "preact/hooks";
import { Numbers } from "../types/sudoku.ts";

type NumberPadProps = {
  gridRef: preact.RefObject<HTMLTableElement>;
};

export const NumberPad = (
  { gridRef }: NumberPadProps,
) => {
  const numbers: Numbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current && containerRef.current.contains(target)) return;
      if (gridRef && gridRef.current && gridRef.current.contains(target)) {
        return;
      }
      // Deselect everything
      if (selectedNumber.value !== "" || pencilEnabled.value) {
        selectedNumber.value = "";
        pencilEnabled.value = false;
        eraserEnabled.value = false;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="flex gap-2 my-4"
    >
      <button
        type="button"
        class={`w-8 h-8 text-lg font-bold rounded ${
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
            class={`w-8 h-8 text-lg font-bold rounded relative ${
              selectedNumber.value === num
                ? "border-2 border-green-500 bg-green-100"
                : "border border-gray-300 bg-white"
            } text-gray-900 cursor-pointer flex items-center justify-center`}
            aria-pressed={selectedNumber.value === num}
            onClick={() => {
              selectedNumber.value = selectedNumber.value === num ? "" : num;
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
        class={`w-8 h-8 text-lg font-bold rounded ${
          eraserEnabled.value
            ? "border-2 border-green-500 bg-green-100"
            : "border border-gray-300 bg-white"
        } text-gray-900 cursor-pointer flex items-center justify-center`}
        title="Eraser"
        aria-pressed={eraserEnabled.value}
        onClick={() => {
          eraserEnabled.value = true;
          pencilEnabled.value = false;
          selectedNumber.value = "";
        }}
      >
        🧹
      </button>
    </div>
  );
};
