import type { ExampleBoard } from "../types/sudoku.ts";
import { SudokuGrid } from "./SudokuGrid.tsx";
import { OverlayLayer } from "../components/OverlayLayer.tsx";

/**
 * SudokuExample renders all steps in an ExampleBoard, each with overlays and description.
 */
export const SudokuExample = (
  { example }: { example: ExampleBoard },
) => {
  return (
    <div class="flex flex-wrap gap-6 justify-center items-start">
      {example.steps.map((step, idx) => (
        <div key={idx} class="">
          <SudokuGrid
            initialBoard={example.board}
            gridRef={{ current: null }}
            targetCell={null}
          />
          <OverlayLayer overlays={step.overlays} />
          {step.description && (
            <div class="mt-2 text-sm text-gray-700 text-center w-full">
              {step.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
