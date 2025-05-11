/**
 * Standalone SVG border test route for debugging overlay sizing.
 */

import { SudokuGrid } from "../islands/SudokuGrid.tsx";
import { createEmptyBoard } from "../generators/utils/createEmptyBoard.ts";

const emptyBoard = createEmptyBoard();

const SvgBorderTest = () => (
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="relative aspect-square w-full max-w-xs border border-gray-300 bg-white">
      <div class="absolute left-0 top-0 w-full h-full z-0">
        <SudokuGrid
          initialBoard={emptyBoard}
          gridRef={{ current: null }}
          targetCell={null}
        />
      </div>
      <svg
        class="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 9 9"
        style={{
          aspectRatio: "1/1",
          inset: 0,
          height: "100%",
          width: "100%",
          display: "block",
        }}
      >
        <rect
          x={0}
          y={0}
          width={9}
          height={9}
          fill="none"
          stroke="#2563eb"
          strokeWidth={0.08}
        />
      </svg>
    </div>
  </div>
);

export default SvgBorderTest;
